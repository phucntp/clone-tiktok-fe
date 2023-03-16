"use client";
import newsActions from "@/actions/news";
import ItemNews from "@/components/atoms/news/ItemNews";
import { AppState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ListNews() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.newsReducer);
  console.log(data, "data");

  useEffect(() => {
    dispatch(newsActions.getNewsAll());
  }, [dispatch]);

  return (
    <div>
      {data.length &&
        data.map((item) => <ItemNews key={item._id} data={item} />)}
    </div>
  );
}

export default ListNews;
