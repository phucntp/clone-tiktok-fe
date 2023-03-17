import React from "react";
import styles from "./ItemNews.module.scss";
import Avatar from "@/components/atoms/images/avatar/Avatar";
import NormalVideo from "@/components/atoms/video/NormalVideo";
import IconHeart from "@/components/atoms/icons/IconHeart";
import IconComment from "@/components/atoms/icons/IconComment";
import IconShare from "@/components/atoms/icons/IconShare";
import { TNews } from "@/types/news";

type TProps = {
  data: TNews;
};

function ItemNews({ data }: TProps) {
  return (
    <div className="keen-slider__slide">
      <div className={styles.videoItem}>
        <NormalVideo src={data.url} />
      </div>
      <div className={styles.containerItem}>
        <Avatar className={styles.avatar} />
        <div className={styles.contentItem}>
          <div className={styles.infoNews}>
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>{data.title}</div>
              <div className={styles.infDescription}>{data.description}</div>
            </div>
            <button className={styles.buttonFollow}>Follow</button>
          </div>
          <div className={styles.socialItem}>
            <div className={styles.videoItem}>
              <NormalVideo src={data.url} />
            </div>
            <div className={styles.listButtonSocial}>
              <div className={styles.buttonSocial}>
                <button className={styles.buttonFavorite}>
                  <IconHeart />
                </button>
                <div className={styles.buttonCount}>2000</div>
              </div>
              <div className={styles.buttonSocial}>
                <button className={styles.buttonComment}>
                  <IconComment />
                </button>
                <div className={styles.buttonCount}>2000</div>
              </div>
              <div className={styles.buttonSocial}>
                <button className={styles.buttonShare}>
                  <IconShare />
                </button>
                <div className={styles.buttonCount}>2000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemNews;
