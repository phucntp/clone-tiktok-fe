"use client";

import profileActions from "@/actions/profile";
import NormalButton from "@/components/atoms/buttons/NormalButton";
import InputNormal from "@/components/atoms/form/inputs/input-normal/InputNormal";
import SelectBox from "@/components/atoms/form/select-box/SelectBox";
import UploadImageBasic from "@/components/molecules/upload/image/UploadImageBasic";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./UploadImage.module.scss";

function UploadImage() {
  const [file, setFile] = useState<File>();
  const dispatch = useDispatch();
  const t = useTranslations();

  const handleFile = (file: File) => {
    setFile(file);
  };

  const handleSubmit = () => {
    if (file?.name) {
      const formData: FormData = new FormData();
      formData.append("image", file);
      dispatch(
        profileActions.updateAvatar({ file: formData, username: "Phucabc" })
      );
    }
  };
  return (
    <div className={styles.uploadContainer}>
      <div className="text-black pb-20">
        <h2 className="mb-5">{t("upload.title")}</h2>
        <p>{t("upload.description")}</p>
      </div>
      <form>
        <UploadImageBasic setFile={handleFile} />
        <div className={styles.formRight}>
          <div className={styles.itemRight}>
            <label className="text-black">{t("upload.caption")}</label>
            <InputNormal className="background-white" />
          </div>
          <div className={styles.itemRight}>
            <label className="text-black">{t("upload.cover")}</label>
            <InputNormal className="background-white" />
          </div>
          <div className={styles.itemRight}>
            <label className="text-black">
              {t("upload.who_can_watch_this_video")}
            </label>
            <SelectBox className="w-40" valueSelect="0" listOption={[]} />
          </div>
          <div className={styles.itemRight}>
            <label className="text-black">{t("upload.allows_users_to")}</label>
            <div></div>
          </div>
          <div className={styles.itemRight}>
            <label className="text-black">
              {t("upload.run_a_copyright_check")}
            </label>
            <div></div>
          </div>
          <div>
            <label className="text-black">
              {t("upload.who_can_watch_this_video")}
            </label>
            <SelectBox valueSelect="0" listOption={[]} />
          </div>
          <div>
            <NormalButton
              label={t("common.button.discard")}
              handleClick={handleSubmit}
            />
            <NormalButton
              label={t("common.button.post")}
              handleClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
