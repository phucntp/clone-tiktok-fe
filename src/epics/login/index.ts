import { errorActions } from "@/actions/errorActions";
import loginActions from "@/actions/login";
import { authServices } from "@/services/auth";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import loginReducer, { TStateLogin } from "@/reducers/login";

const ac = actionCreatorFactory("[epics/login]");

const _actionLogin = {
  loginNext: ac<TStateLogin>("getExpertStatusNext"),
};
const loginEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(loginActions.login),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(authServices.loginUser(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateLogin) => _actionLogin.loginNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const loginEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionLogin.loginNext),
    map(({ payload }) => {
      return loginReducer.actions.set(payload);
    })
  );
export const loginEpics = combineEpics(loginEpic, loginEpicNext);
