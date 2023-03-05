import { errorActions } from "@/actions/errorActions";
import forgotPasswordActions from "@/actions/forgotPassword";
import { authServices } from "@/services/auth";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import forgotPasswordReducer, {
  TStateForgotPassword,
} from "@/reducers/forgotPassword";

const ac = actionCreatorFactory("[epics/forgotPassword]");

const _actionForgotPassword = {
  forgotPasswordNext: ac<TStateForgotPassword>("getExpertStatusNext"),
};
const forgotPasswordEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(forgotPasswordActions.forgotPassword),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(authServices.forgotPasswordUser(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateForgotPassword) =>
          _actionForgotPassword.forgotPasswordNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const forgotPasswordEpicNext: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    ofAction(_actionForgotPassword.forgotPasswordNext),
    map(({ payload }) => {
      return forgotPasswordReducer.actions.set(payload);
    })
  );
export const forgotPasswordEpics = combineEpics(
  forgotPasswordEpic,
  forgotPasswordEpicNext
);
