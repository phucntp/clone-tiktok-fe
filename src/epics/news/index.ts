import { errorActions } from "@/actions/errorActions";
import loadingModule from "@/reducers/ui/loading";
import { asyncActionWithCallback, WrapAction } from "@/types/store/epic";
import { combineEpics, Epic } from "redux-observable";
import { from, map } from "rxjs";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import { ofAction } from "typescript-fsa-redux-observable-of-action";
import { AppState } from "@/store";
import listNewsReducer, { TStateListNews } from "@/reducers/listNews";
import newsActions from "@/actions/news";
import { newsServices } from "@/services/news";
import newsReducer, { TStateNews } from "@/reducers/news";
import favoriteNewsReducer, { TStateFavorite } from "@/reducers/favoriteNews";

const ac = actionCreatorFactory("[epics/news]");

const _actionNews = {
  listNewsNext: ac<TStateListNews>("getListNewsNext"),
  newsNext: ac<TStateNews>("getNewsNext"),
  favoriteNext: ac<TStateFavorite>("favoriteNext"),
};
const listNewsEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(newsActions.getNewsAll),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(newsServices.getNewsAll(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateListNews) => _actionNews.listNewsNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const listNewsEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionNews.listNewsNext),
    map(({ payload }) => {
      listNewsReducer.actions.setIndexVideo(null);
      return listNewsReducer.actions.set(payload);
    })
  );
const newsEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(newsActions.getNewsId),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(newsServices.getNewsId(payload)),
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
      return newsReducer.actions.set(payload);
    })
  );
const favoriteNewsEpic: Epic<
  AnyAction,
  WrapAction<typeof asyncActionWithCallback>, //
  AppState
> = (action$) =>
  action$.pipe(
    ofAction(newsActions.favorite),
    map(({ payload }) =>
      asyncActionWithCallback({
        previous: loadingModule.actions.on(),
        asyncFunc: from(newsServices.favoriteNews(payload)),
        error: (error: any) => errorActions.throwError(error),
        next: (res: TStateFavorite) => _actionNews.favoriteNext(res),
        complete: loadingModule.actions.off(),
      })
    )
  );
const favoriteNewsEpicNext: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    ofAction(_actionNews.favoriteNext),
    map(({ payload }) => {
      return favoriteNewsReducer.actions.set(payload);
    })
  );
export const newsEpics = combineEpics(
  listNewsEpic,
  listNewsEpicNext,
  newsEpic,
  newsEpicNext,
  favoriteNewsEpic,
  favoriteNewsEpicNext
);
