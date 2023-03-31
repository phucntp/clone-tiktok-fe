import { errorActions } from "@/actions/errorActions";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import uploadImageReducer, { TStateUploadImage } from "@/reducers/uploadImage";
import uploadActions from "@/actions/upload";
import { uploadServices } from "@/services/upload";
import getImageReducer, { TStateImage } from "@/reducers/getImage";

const ac = actionCreatorFactory("[epics/uploadImage]");

const _actionUploadImage = {
  uploadImageNext: ac<TStateUploadImage>("uploadImageNext"),
  getImageNext: ac<TStateImage>("getImageNext"),
};
const uploadImageEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(uploadActions.uploadImage),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(uploadServices.uploadImage(payload)),
        error: (error: any) => {
          loadingModule.actions.off();
          return errorActions.throwError(error);
        },
        next: (res: TStateUploadImage) =>
          _actionUploadImage.uploadImageNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const uploadImageEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUploadImage.uploadImageNext),
    map(({ payload }) => {
      return uploadImageReducer.actions.set(payload);
    })
  );

const getImageEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(uploadActions.getImage),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(uploadServices.getImage(payload)),
        error: (error: any) => {
          loadingModule.actions.off();
          return errorActions.throwError(error);
        },
        next: (res: TStateImage) => _actionUploadImage.getImageNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const getImageEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionUploadImage.getImageNext),
    map(({ payload }) => {
      return getImageReducer.actions.set(payload);
    })
  );
export const uploadImageEpics = combineEpics(
  uploadImageEpic,
  uploadImageEpicNext,
  getImageEpic,
  getImageEpicNext
);
