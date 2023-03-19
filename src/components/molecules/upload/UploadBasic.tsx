"use client";

import NormalButton from "@/components/atoms/buttons/NormalButton";
import { useTranslations } from "next-intl";
import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "./UploadBasic.module.scss";

function UploadBasic() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const t = useTranslations();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <section
      className={`container w-260-px h-458-px ${styles.containerBasicUpload}`}
    >
      <div {...getRootProps({ className: "dropzone text-black" })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
        <NormalButton
          className="button-danger px-20"
          label={t("common.button.select_file")}
        />
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
export default UploadBasic;
