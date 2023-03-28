import { errorActions } from "@/actions/errorActions";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { concatMap, from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import updateAvatarReducer, {
  TStateUpdateAvatar,
} from "@/reducers/updateAvatar";
import profileActions from "@/actions/profile";
import { profileServices } from "@/services/profile";
import { uploadServices } from "@/services/upload";

const ac = actionCreatorFactory("[epics/updateAvatar]");

const _actionUpdateAvatar = {
  updateAvatarNext: ac<TStateUpdateAvatar>("updateAvatarNext"),
};
const updateAvatarEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(profileActions.updateAvatar),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(uploadServices.uploadImage(payload.file)).pipe(
          concatMap((res) => {
            return profileServices.updateProfile({
              url: res.data.url,
              username: payload.username,
            });
          })
        ),
        error: (error: any) => {
          loadingModule.actions.off();
          return errorActions.throwError(error);
        },
        next: (res: TStateUpdateAvatar) =>
          _actionUpdateAvatar.updateAvatarNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const updateAvatarEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUpdateAvatar.updateAvatarNext),
    map(({ payload }) => {
      return updateAvatarReducer.actions.set(payload);
    })
  );

export const updateAvatarEpics = combineEpics(
  updateAvatarEpic,
  updateAvatarEpicNext
);
