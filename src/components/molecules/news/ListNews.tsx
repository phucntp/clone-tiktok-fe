"use client";
import newsActions from "@/actions/news";
import ItemNews from "@/components/atoms/news/ItemNews";
import { AppState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeenSlider } from "keen-slider/react"
import useBreakpoint from "@/hooks/useBreakpoint";
import "keen-slider/keen-slider.min.css"
import styles from "./ListNews.module.scss"

function ListNews() {
  const breakpoint = useBreakpoint();
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      origin: "center",
      perView: breakpoint === "SM" ? 1 : 2,
      spacing: 10,
    },
    vertical: true,
  })
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.newsReducer);
  

  useEffect(() => {
    dispatch(newsActions.getNewsAll());
  }, [dispatch]);

  return (
    <div className={styles.containerHome}>
      <div ref={ref} className="keen-slider" style={{width: '100%', height: "100%"}}>
      {data.length &&
        data.map((item) => <ItemNews key={item._id} data={item} />)}
    </div>
    </div>
  );
}

export default ListNews;
