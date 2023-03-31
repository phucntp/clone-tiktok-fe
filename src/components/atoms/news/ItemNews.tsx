import React from "react";
import styles from "./ItemNews.module.scss";
import Avatar from "@/components/atoms/images/avatar/Avatar";
import NormalVideo from "@/components/atoms/video/NormalVideo";
import IconHeart from "@/components/atoms/icons/IconHeart";
import IconComment from "@/components/atoms/icons/IconComment";
import IconShare from "@/components/atoms/icons/IconShare";
import { TNews, TUrlVideo } from "@/types/news";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useTranslations } from "next-intl";

type TProps = {
  data: TNews;
  index?: number;
  urlVideo?: TUrlVideo;
  currentIndex: number;
};

function ItemNews({ data, index = 0, urlVideo, currentIndex }: TProps) {
  const breakpoint = useBreakpoint();
  const t = useTranslations();

  return (
    <div className="keen-slider__slide">
      {breakpoint === "SM" && (
        <div className={styles.videoItem}>
          <NormalVideo
            index={index}
            id={data._id}
            src={urlVideo?.url}
            idUrl={urlVideo?.id}
            currentIndex={currentIndex}
          />
        </div>
      )}
      <div className={styles.containerItem}>
        <Avatar width={48} height={48} isAdd={breakpoint === "SM"} />
        <div className={styles.contentItem}>
          <div className={styles.infoNews}>
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>{data.title}</div>
              <div className={styles.infDescription}>{data.description}</div>
            </div>
            <button className={styles.buttonFollow}>
              {t("common.button.follow")}
            </button>
          </div>
          <div className={styles.socialItem}>
            <div className={styles.videoItem}>
              {breakpoint !== "SM" && (
                <NormalVideo
                  index={index}
                  className={`w-${data.width}-px h-${data.height}-px background-gray`}
                  id={data._id}
                  src={urlVideo?.url}
                  idUrl={urlVideo?.id}
                  currentIndex={currentIndex}
                />
              )}
              <div className={styles.listButtonSocial}>
                <div className={styles.buttonSocial}>
                  <button className={styles.buttonFavorite}>
                    <IconHeart />
                  </button>
                  <div className={styles.buttonCount}>{data.like_count}</div>
                </div>
                <div className={styles.buttonSocial}>
                  <button className={styles.buttonComment}>
                    <IconComment />
                  </button>
                  <div className={styles.buttonCount}>{data.comment_count}</div>
                </div>
                <div className={styles.buttonSocial}>
                  <button className={styles.buttonShare}>
                    <IconShare />
                  </button>
                  <div className={styles.buttonCount}>{data.share_count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemNews;
