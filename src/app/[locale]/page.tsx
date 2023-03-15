"use client";
import { LayoutHome } from "@/components/layouts/home/LayoutHome";
import styles from "./page.module.scss";
import Avatar from "@/components/atoms/images/avatar/Avatar";
import NormalVideo from "@/components/atoms/video/NormalVideo";
import IconHeart from "@/components/atoms/icons/IconHeart";
import IconComment from "@/components/atoms/icons/IconComment";
import IconShare from "@/components/atoms/icons/IconShare";

export default function Home() {
  return (
    <LayoutHome>
      <div className={styles.videoItem}>
        <NormalVideo src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />
      </div>
      <div className={styles.containerHome}>
        <div className={styles.containerItem}>
          <Avatar className={styles.avatar} />
          <div className={styles.contentItem}>
            <div className={styles.infoNews}>
              <div className={styles.infoItem}>
                <div className={styles.infoTitle}>Title</div>
                <div className={styles.infDescription}>Description</div>
              </div>
              <button className={styles.buttonFollow}>Follow</button>
            </div>
            <div className={styles.socialItem}>
              <div className={styles.videoItem}>
                <NormalVideo src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />
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
    </LayoutHome>
  );
}
