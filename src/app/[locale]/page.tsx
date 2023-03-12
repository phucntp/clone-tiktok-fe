"use client";
import { LayoutHome } from "@/components/layouts/home/LayoutHome";
import styles from "./page.module.scss";
import Avatar from "@/components/atoms/images/avatar/Avatar";
import Image from "next/image";

export default function Home() {
  return (
    <LayoutHome>
      <div className={styles.containerHome}>
        <div className="d-flex">
          <Avatar />
          <div>
            <div className="d-flex">
              <div>Information</div>
              <button>Follow</button>
            </div>
            <div className="d-flex">
              <div>
                <video
                  autoPlay
                  loop
                  src={"/download.mp4"}
                  style={{ width: "500px", height: "500px" }}
                ></video>
                <Image
                  src={"/en/th.png"}
                  width={40}
                  height={40}
                  alt="Picture of the author"
                  className=""
                />
              </div>
              <div className="d-flex-col">
                <button>
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    width="24"
                    height="24"
                  >
                    <use xlinkHref="#svg-heart-fill"></use>
                  </svg>
                </button>
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use xlinkHref="#svg-ellipsis-right-fill"></use>
                  </svg>
                </button>
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use xlinkHref="#svg-pc-share"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
}
