import NormalTag from "@/components/atoms/tags/NormalTag";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./Discover.module.scss";

type TProps = {
  className?: string;
};

function Discover({ className = "" }: TProps) {
  const t = useTranslations();
  return (
    <div className={`${styles.discoverContainer} ${className}`}>
      <div className={styles.title}>{t("layout.title.discover")}</div>
      <div className={styles.tags}>
        <NormalTag />
        <NormalTag />
        <NormalTag />
        <NormalTag />
        <NormalTag />
      </div>
    </div>
  );
}

export default Discover;
