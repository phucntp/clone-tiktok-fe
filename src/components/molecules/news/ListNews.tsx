/* eslint-disable no-unused-vars */
"use client";
import newsActions from "@/actions/news";
import ItemNews from "@/components/atoms/news/ItemNews";
import { AppState } from "@/store";
import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./ListNews.module.scss";
import uploadActions from "@/actions/upload";
import getVideoReducer from "@/reducers/getVideo";

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
  const { data, pagination, dataNew } = useSelector(
    (state: AppState) => state.listNewsReducer
  );
  const { isLoading } = useSelector(
    (state: AppState) => state.uiReducers.loadingReducer
  );
  const { listVideo } = useSelector((state: AppState) => state.getVideoReducer);
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [sliderRef, internalSlider] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      rubberband: false,
      vertical: true,
      initial: 0,
      slideChanged: (slider) => {
        setCurrentIndex(slider.track.details.abs || 0);
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
  }, []);

  useEffect(() => {
    if (
      pagination.total &&
      !isLoading &&
      data.length &&
      currentIndex === data.length - 1
    ) {
      if (
        pagination.currentPage &&
        pagination.totalPage &&
        pagination.currentPage < pagination.totalPage
      ) {
        dispatch(
          newsActions.getNewsAll({
            limit: pagination.limit,
            currentPage: pagination.currentPage + 1,
          })
        );
      }
    }
  }, [pagination, currentIndex, data, dispatch, isLoading]);

  useEffect(() => {
    dispatch(
      newsActions.getNewsAll({
        limit: 5,
        currentPage: 1,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentIndex >= 0) {
      dispatch(
        uploadActions.getVideo({
          id: data?.[currentIndex]?._id,
          url: data?.[currentIndex]?.url,
        })
      );
    }
  }, [currentIndex, data, dispatch]);

  useEffect(() => {
    internalSlider?.current?.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    // dataNew.map((news) => {
    //   dispatch(
    //     uploadActions.getVideo({
    //       id: news._id,
    //       url: news.url,
    //     })
    //   );
    // });
    dispatch(
      uploadActions.getVideo({
        id: dataNew?.[0]?._id,
        url: dataNew?.[0]?.url,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataNew]);

  return (
    <>
      <div className={styles.containerHome}>
        {data && data.length ? (
          <div
            ref={sliderRef}
            className="keen-slider"
            style={{ width: "100%", height: "100vh" }}
          >
            {data.map((item, index) => (
              <ItemNews
                index={index}
                key={item._id}
                urlVideo={listVideo.find((url) => url.id === item._id)}
                data={item}
                currentIndex={currentIndex}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default memo(ListNews);
