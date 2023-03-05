import { errorActions } from "@/actions/errorActions";
import refreshTokenActions from "@/actions/refreshToken";
import { authServices } from "@/services/auth";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import refreshTokenReducer, {
  TStateRefreshToken,
} from "@/reducers/refreshToken";

const ac = actionCreatorFactory("[epics/refreshToken]");

const _actionRefreshToken = {
  refreshTokenNext: ac<TStateRefreshToken>("getExpertStatusNext"),
};
const refreshTokenEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(refreshTokenActions.refreshToken),
    map(() =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(authServices.refreshTokenUser()),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateRefreshToken) =>
          _actionRefreshToken.refreshTokenNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const refreshTokenEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionRefreshToken.refreshTokenNext),
    map(({ payload }) => {
      return refreshTokenReducer.actions.set(payload);
    })
  );
export const refreshTokenEpics = combineEpics(
  refreshTokenEpic,
  refreshTokenEpicNext
);
