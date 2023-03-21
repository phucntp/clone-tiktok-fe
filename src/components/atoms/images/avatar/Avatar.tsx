import React from "react";
import Image from "next/image";
import styles from "./Avartar.module.scss";
import IconAdd from "../../icons/IconAdd";

type TProps = {
  className?: string;
  isAdd?: boolean;
  onClickAdd?: () => void;
  height?: number;
  width?: number;
};

function Avatar({
  className = "",
  isAdd = false,
  onClickAdd,
  width = 56,
  height = 56,
}: TProps) {
  return (
    <a className={`${styles.containerAvatar} ${className}`}>
      <Image
        src="data:image/jpeg;base64,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"
        width={width}
        height={height}
        alt="Picture of the author"
        className={styles.avatar}
      />
      {isAdd && (
        <button className={styles.addButton} onClick={onClickAdd}>
          <IconAdd width={14} height={14} color="#fff" />
        </button>
      )}
    </a>
  );
}

export default Avatar;
