"use client";

import React, { useRef } from "react";
import styles from "./Modal.module.scss";
import ButtonBack from "@/components/atoms/buttons/ButtonBack";
import ButtonClose from "@/components/atoms/buttons/ButtonClose";
import { useClickAway } from "react-use";

type TProps = {
  children: React.ReactNode;
  height?: string;
  width?: string;
  showModal: boolean;
  handleBack: () => void;
  handleClose: () => void;
};

function Modal({
  children,
  height,
  width,
  handleBack,
  handleClose,
  showModal,
}: TProps) {
  const ref = useRef(null);
  useClickAway(ref, () => {
    handleClose();
  });
  return (
    <div ref={ref}>
      {showModal && (
        <div
          className={styles.modalContainer}
          style={{ height: height, width: width }}
        >
          <div className="w-95 m-auto mt-20 position-relative">
            <ButtonClose
              height={36}
              width={36}
              className="float-right background-none border-none"
              handleBack={handleBack}
            />
            <ButtonBack
              height={36}
              width={36}
              className="float-left background-none border-none"
              handleClose={handleClose}
            />
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

export default Modal;
