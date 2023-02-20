import actionCreatorFactory from 'typescript-fsa';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { combineEpics, Epic } from 'redux-observable';
import { Action, AnyAction } from '@reduxjs/toolkit';
import { AppState } from '@/store';
import { errorActions } from '@/root/errorActions';
import { ActionParameter, asyncActionWithCallback, WrapAction } from 'shared/dist/lib/reduxObservableUtils';
import { concatMap, filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { autoLoginModule } from '@/store/ui/autoLogin';
import { forkJoin, from } from 'rxjs';
import { authenticationsModule } from '@/store/auths/authentications';
import { CallHistoryMethodAction, getLocation, replace } from 'connected-react-router';
import { isNonNullable, ReturnTypeExcludePromise } from 'shared/dist/lib/types';
import {
  ERedirectLoggedInAction,
  ETokenType,
  EUserType,
  isExpertUser,
  isOrdererUser,
  isRedirectLoggedInActionCode,
  TRedirectLoggedInActionCode,
} from 'shared/dist/domain/shared';
import {
  getOrdererLoggedInMessageCode,
  isForcedMoveBillingPage,
  isForcedMoveOrdererRegistPage,
  isForcedMoveTopPage,
} from 'shared/dist/domain/models/ordererStatus';
import {
  getExpertLoggedInMessageCode,
  isForcedMoveExpertBasicInformationPage,
  isForcedMoveExpertRegistPage,
  isForcedMoveProjectListPage,
  isForcedMoveTopPage4Expert,
} from 'shared/dist/domain/models/expertStatus';
import { expertModule } from '@/store/entities/expert';
import { ordererStatusServices } from '@/application/services/ordererStatus';
import { ordererStatusModule } from '@/store/entities/ordererStatus';
import {
  ELoggedInRedirectPath,
  EPath,
  LIGHT_MEMBER_EXPERT_AND_ISINFOFILLED_PATHS,
  LIGHT_MEMBER_ORDERDER_PATHS,
  LIGHT_MEMBER_EXPERT_PATHS,
} from '@/presentation/lookups/path';
import { ApiError } from 'shared/dist/lib/types/error';
import { nikkeiServices } from '@/application/services/nid';
import { Logger } from '@/di';
import { loadingModule } from '@/store/ui/loading';
import { addQueryParams, getUrlOrigin, isMatchPathname } from '@/presentation/helpers';

import { autorizeEvents } from '@/presentation/events';
import { buildNCIDQuery, getCookie, removeCookie } from '@/root/cookie';
import { authServices } from '@/application/services/auth';
import { ordererModule } from '@/store/entities/orderer';
import { authorizeActions } from '@/root/authorizeAction';
import { expertStatusModule } from '@/store/entities/expertStatus';
import { LoggedInResponse } from '@/presentation/types';
import { expertStatusServices } from '@/application/services/expertStatus';
import { equals } from 'shared/dist/lib/ramda';
import { getValueOrElse } from 'shared/dist/lib/utils/getValueOrElse';
import { EExpertUserStatus } from 'shared/dist/domain/models/expertStatus/expertUserStatus';
import { isNull } from 'shared/dist/lib/validation';
import * as Sentry from '@sentry/browser';
import { resourceService } from '@/application/services/resourceChecking';
import { matchPath } from 'react-router-dom';
import { isPrivatePath } from '../../../presentation/helpers/path';
import { isExpertRouter, isExpertSignUp, isOrdererRouter } from '../../../presentation/lookups/router';
import {
  checkPathInList,
  getTypeofPathname,
  getValue,
  listPathnameNeedCheckId,
} from '../../../presentation/lookups/checkResource';

type TGetExpertStatusNext = ReturnTypeExcludePromise<typeof expertStatusServices.getDetail>;
type TGetOrdererStatusNext = ReturnTypeExcludePromise<typeof ordererStatusServices.getDetail>;
type TGetRedirectUriNext = ReturnTypeExcludePromise<typeof nikkeiServices.getNikkeiLoginUri>;
type TLoginNikkei = Parameters<typeof authServices.loginNikkei>[0];
type TLoginNikkeiNext = ReturnTypeExcludePromise<typeof authServices.loginNikkei>;
type TLoginNext = LoggedInResponse;
type TLogoutNext = ReturnTypeExcludePromise<typeof authServices.logout>;

const ac = actionCreatorFactory('[listener/auth]');
const _actions = {
  getExpertStatusNext: ac<TGetExpertStatusNext>('getExpertStatusNext'),
  getOrdererStatusNext: ac<TGetOrdererStatusNext>('getOrdererStatusNext'),
  getRedirectUriNext: ac<TGetRedirectUriNext>('getRedirectUriNext'),
  redirectAnotherPageError: ac<any>('redirectAnotherPageError'),
  loginNikkei: ac<TLoginNikkei>('loginNikkei'),
  loginNikkeiNext: ac<TLoginNikkeiNext>('loginNikkeiNext'),
  loginNext: ac<TLoginNext>('loginNext'),
  logoutNext: ac<TLogoutNext>('logoutNext'),
  removeRedirectLoggedInActionCode: ac<void>('removeRedirectLoggedInActionCode'),
  throwRedirectError: ac<{ errorMessage: string }>('throwRedirectError'),
};

/**
 * エキスパートログイン後にステータスを取得する
 */
const _loggedInExpertStatusNext = (payload: ActionParameter<typeof authenticationsModule.actions.login>) => {
  return asyncActionWithCallback({
    // エキスパートのステータス情報を取得する
    asyncFunc: from(expertStatusServices.getDetail(payload.id)),
    error: (error: any) => errorActions.throwError(error),
    next: (res: TGetExpertStatusNext) => _actions.getExpertStatusNext(res),
  });
};

const _loggedInOrdererStatusNext = (payload: ActionParameter<typeof authenticationsModule.actions.login>) => {
  return asyncActionWithCallback({
    // 発注者のステータス情報を取得する
    asyncFunc: from(ordererStatusServices.getDetail(payload.id)),
    error: (error: any) => errorActions.throwError(error),
    next: (res: TGetOrdererStatusNext) => _actions.getOrdererStatusNext(res),
  });
};

/**
 * 現在のpathを取得する
 */
export const currentPath = (store: AppState) => getLocation(store).pathname;

/**
 * authenticationsModule.actions.loginを検知して実行するEpic
 */
const loggedInNext: Epic<AnyAction, WrapAction<typeof asyncActionWithCallback>, AppState> = (action$) =>
  action$.pipe(
    // NOTICE: StoreのActionを元に動作するepicはよくない認識なので、真似しないでください。
    ofAction(authenticationsModule.actions.login),
    // // '/authorize' 直下では実行しない（不要そうなので一旦コメントアウトしました）
    // filter(() => !isAuthorizePath(currentPath(store.value))),
    // expert、orderer場合、実行する
    filter(
      ({ payload }) =>
        (isExpertUser(payload.userType) && payload.isInfoFilled) ||
        (isOrdererUser(payload.userType) && payload.isRegularMember),
    ),
    map(({ payload }) => {
      if (isExpertUser(payload.userType)) {
        return _loggedInExpertStatusNext(payload);
      }
      return _loggedInOrdererStatusNext(payload);
    }),
  );
