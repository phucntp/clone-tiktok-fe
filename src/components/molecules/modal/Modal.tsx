import React from "react";
import styles from "./Modal.module.scss";

interface Props {
  children: React.ReactNode;
  height?: string;
  width?: string;
}

function Modal({ children, height, width }: Props) {
  return (
    <>
      <div
        className={styles.modalContainer}
        style={{ height: height ?? "", width: width ?? "" }}
      >
       {children}
      </div>
    </>
  );
}

export default Modal;
