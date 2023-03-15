import { errorActions } from "@/actions/errorActions";
import { authServices } from "@/services/auth";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import logoutReducer, { TStateLogout } from "@/reducers/logout";
import logoutActions from "@/actions/logout";

const ac = actionCreatorFactory("[epics/logout]");

const _actionLogout = {
  logoutNext: ac<TStateLogout>("getExpertStatusNext"),
};
const logoutEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(logoutActions.logout),
    map(() =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(authServices.logoutUser()),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateLogout) => _actionLogout.logoutNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const logoutEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionLogout.logoutNext),
    map(({ payload }) => {
      return logoutReducer.actions.set(payload);
    })
  );
export const logoutEpics = combineEpics(logoutEpic, logoutEpicNext);
