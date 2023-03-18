"use client";
import newsActions from "@/actions/news";
import ItemNews from "@/components/atoms/news/ItemNews";
import { AppState } from "@/store";
import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./ListNews.module.scss";

const WheelControls: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>;
  let position: {
    x: number;
    y: number;
  };
  let wheelActive: boolean;

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, "ksDragStart");
  }

  function wheel(e: WheelEvent) {
    dispatch(e, "ksDrag");
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, "ksDragEnd");
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault();
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    });
  });
};

function ListNews() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      rubberband: false,
      vertical: true,
    },
    [WheelControls]
  );
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.newsReducer);

  useEffect(() => {
    dispatch(newsActions.getNewsAll());
  }, [dispatch]);

  return (
    <div className={styles.containerHome}>
      <div
        ref={sliderRef}
        className="keen-slider"
        style={{ width: "100%", height: "100vh" }}
      >
        {data.length &&
          data.map((item) => <ItemNews key={item._id} data={item} />)}
      </div>
    </div>
  );
}

export default memo(ListNews);
