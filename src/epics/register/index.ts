import { errorActions } from "@/actions/errorActions";
import registerActions from "@/actions/register";
import { authServices } from "@/services/auth";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import registerReducer, { TStateRegister } from "@/reducers/register";

const ac = actionCreatorFactory("[epics/register]");

const _actionRegister = {
  registerNext: ac<TStateRegister>("getExpertStatusNext"),
};
const registerEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(registerActions.register),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(authServices.registerUser(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateRegister) => _actionRegister.registerNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const registerEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionRegister.registerNext),
    map(({ payload }) => {
      return registerReducer.actions.set(payload);
    })
  );
export const registerEpics = combineEpics(registerEpic, registerEpicNext);
