"use client";

import useLazyLoad from "@/hooks/useLazyLoad";
import { AppState } from "@/store";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading/Loading";
import styles from "./BlockScroll.module.scss";

type TProps = {
  handleLoad: () => void;
};

const BlockScroll = ({ handleLoad }: TProps) => {
  const { isLoading } = useSelector(
    (state: AppState) => state.uiReducers.loadingReducer
  );
  const triggerRef = useRef<HTMLDivElement>(null);
  useLazyLoad({ triggerRef, onGrabData: handleLoad, loading: isLoading });

  return (
    <>
      <div
        className={`${styles.trigger} ${!isLoading ? styles.visible : ""}`}
        ref={triggerRef}
      >
        <Loading loading={isLoading} />
      </div>
    </>
  );
};

export default BlockScroll;
