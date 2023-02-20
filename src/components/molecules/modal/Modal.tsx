import React from "react";
import styles from "./Modal.module.scss";

interface Props {
  children: React.ReactNode;
}

function Modal({ children }: Props) {
  return <div className={styles.modalContainer}>{children}</div>;
}

export default Modal;
