import { errorActions } from "@/actions/errorActions";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import listUserReducer, { TStateListUser } from "@/reducers/listUser";
import userActions from "@/actions/user";
import { userServices } from "@/services/user";
import userReducer, { TStateUser } from "@/reducers/user";
import followingUserReducer, {
  TStateFollowing,
} from "@/reducers/followingUser";

const ac = actionCreatorFactory("[epics/user]");

const _actionUser = {
  listUserNext: ac<TStateListUser>("getListUserNext"),
  userNext: ac<TStateUser>("getUserNext"),
  followingNext: ac<TStateFollowing>("followingNext"),
};
const listUserEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(userActions.getListUser),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(userServices.getListUser(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateListUser) => _actionUser.listUserNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const listUserEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUser.listUserNext),
    map(({ payload }) => {
      return listUserReducer.actions.set(payload);
    })
  );
const userEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(userActions.getUsername),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(userServices.getUsername(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateUser) => _actionUser.userNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const userEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUser.userNext),
    map(({ payload }) => {
      return userReducer.actions.set(payload);
    })
  );
const followingUserEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(userActions.following),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(userServices.followingUser(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateFollowing) => _actionUser.followingNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const followingUserEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUser.followingNext),
    map(({ payload }) => {
      return followingUserReducer.actions.set(payload);
    })
  );
export const userEpics = combineEpics(
  listUserEpic,
  listUserEpicNext,
  userEpic,
  userEpicNext,
  followingUserEpic,
  followingUserEpicNext
);
