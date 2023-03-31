import { errorActions } from "@/actions/errorActions";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import uploadVideoReducer, { TStateUploadVideo } from "@/reducers/uploadVideo";
import uploadActions from "@/actions/upload";
import { uploadServices } from "@/services/upload";
import getVideoReducer, { TStateVideo } from "@/reducers/getVideo";

const ac = actionCreatorFactory("[epics/uploadVideo]");

const _actionUploadVideo = {
  uploadVideoNext: ac<TStateUploadVideo>("uploadVideoNext"),
  getVideoNext: ac<TStateVideo>("getVideoNext"),
};
const uploadVideoEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(uploadActions.uploadVideo),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(uploadServices.uploadVideo(payload)),
        error: (error: any) => {
          loadingModule.actions.off();
          return errorActions.throwError(error);
        },
        next: (res: TStateUploadVideo) =>
          _actionUploadVideo.uploadVideoNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const uploadVideoEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUploadVideo.uploadVideoNext),
    map(({ payload }) => {
      return uploadVideoReducer.actions.set(payload);
    })
  );

const getVideoEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(uploadActions.getVideo),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(uploadServices.getVideo(payload)),
        error: (error: any) => {
          loadingModule.actions.off();
          return errorActions.throwError(error);
        },
        next: (res: TStateVideo) => _actionUploadVideo.getVideoNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const getVideoEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUploadVideo.getVideoNext),
    map(({ payload }) => {
      return getVideoReducer.actions.set(payload);
    })
  );
export const uploadVideoEpics = combineEpics(
  uploadVideoEpic,
  uploadVideoEpicNext,
  getVideoEpic,
  getVideoEpicNext
);
