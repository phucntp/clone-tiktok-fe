import { TReqNews, TReqId, TReqFavorite } from "@/types/news";
import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[news]");
const newsActions = {
  getNewsAll: ac<TReqNews>("getNews"),
  getNewsId: ac<TReqId>("getNewsId"),
  favorite: ac<TReqFavorite>("favoriteNews"),
};
export default newsActions;
