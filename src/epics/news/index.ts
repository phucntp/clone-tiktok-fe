import { errorActions } from "@/actions/errorActions";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import newsReducer, { TStateNews } from "@/reducers/news";
import newsActions from "@/actions/news";
import { newsServices } from "@/services/news";

const ac = actionCreatorFactory("[epics/news]");

const _actionNews = {
  newsNext: ac<TStateNews>("getExpertStatusNext"),
};
const newsEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(newsActions.getNewsAll),
    map(() =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(newsServices.getNewsAll()),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateNews) => _actionNews.newsNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const newsEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionNews.newsNext),
    map(({ payload }) => {
      console.log(payload, "payload");
      return newsReducer.actions.set(payload);
    })
  );
export const newsEpics = combineEpics(newsEpic, newsEpicNext);
