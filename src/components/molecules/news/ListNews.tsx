"use client";
import newsActions from "@/actions/news";
import ItemNews from "@/components/atoms/news/ItemNews";
import { AppState } from "@/store";
import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./ListNews.module.scss";
import listNewsReducer from "@/reducers/listNews";
import axios from "axios";
import { TUrlVideo } from "@/types/news";

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
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.listNewsReducer);
  const [urlInit, setUrlInit] = useState<TUrlVideo[]>([]);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      rubberband: false,
      vertical: true,
      initial: 0,
      slideChanged: (slider) => {
        dispatch(
          listNewsReducer.actions.setIndexVideo(slider.track.details.abs)
        );
      },
    },
    [WheelControls]
  );

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "hidden";
    }
    return () => {
      if (html) {
        html.style.overflow = "auto";
      }
    };
  });

  useEffect(() => {
    dispatch(newsActions.getNewsAll({ limit: 5 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    data.map(async (item) => {
      await axios.get(item.url, { responseType: "blob" }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setUrlInit((prev) => [...prev, { url, id: item._id }]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.containerHome}>
      <div
        ref={sliderRef}
        className="keen-slider"
        style={{ width: "100%", height: "100vh" }}
      >
        {data?.length &&
          data.map((item, index) => (
            <ItemNews
              index={index}
              key={item._id}
              urlVideo={urlInit.find((url) => url.id === item._id)}
              data={item}
            />
          ))}
      </div>
    </div>
  );
}

export default memo(ListNews);
