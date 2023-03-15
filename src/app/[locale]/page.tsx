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
      <div className={styles.containerHome}>
        <div className="d-flex">
          <Avatar />
          <div>
            <div className="d-flex justify-space-between">
              <div>Information</div>
              <button>Follow</button>
            </div>
            <div className="d-flex">
              <div className="mr-10">
                <NormalVideo src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />
              </div>
              <div className="d-flex-col">
                <button>
                  <IconHeart />
                </button>
                <button>
                  <IconComment />
                </button>
                <button>
                  <IconShare />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
}
