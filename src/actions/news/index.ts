import { TReqNews, TReqId, TReqFavorite, TReqCreateNews } from "@/types/news";
import { TRequestUpload } from "@/types/upload";
import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[news]");
const newsActions = {
  getNewsAll: ac<TReqNews>("getNews"),
  getNewsId: ac<TReqId>("getNewsId"),
  favorite: ac<TReqFavorite>("favoriteNews"),
  createNews: ac<{ file: TRequestUpload; data: TReqCreateNews }>("createNews"),
};
export default newsActions;
