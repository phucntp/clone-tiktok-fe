"use client";

import NormalButton from "@/components/atoms/buttons/NormalButton";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./UploadImageBasic.module.scss";
import { MAX_LENGTH_SIZE_VIDEO } from "@/constant/file";
import { convertUrl } from "@/utils/common/file";
import Avatar from "@/components/atoms/images/avatar/Avatar";

export type TProps = {
  // eslint-disable-next-line no-unused-vars
  setFile?: (file: File) => void;
};

function nameLengthValidator(file: File) {
  if (file.name.length > MAX_LENGTH_SIZE_VIDEO) {
    return {
      code: "name-too-large",
      message: `Name is larger than ${MAX_LENGTH_SIZE_VIDEO} characters`,
    };
  }
  return null;
}

function UploadImageBasic({ setFile = () => {} }: TProps) {
  const [files, setFiles] = useState<any[]>([]);

  const { acceptedFiles, getRootProps, getInputProps, open, fileRejections } =
    useDropzone({
      validator: nameLengthValidator,
      multiple: false,
      noClick: true,
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: convertUrl(file),
            })
          )
        );
        setFile(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: convertUrl(file),
            })
          )[0]
        );
      },
    });
  const t = useTranslations();

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      <ul>
        {errors.map((e) => (
          <li className="text-red" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      {acceptedFiles && acceptedFiles.length ? (
        <div>
          <Avatar
            className="w-100 h-100 max-w-260-px max-h-458-px"
            src={files[0].preview}
          />
          <div className={styles.changeVideo}>
            <div className="text-black">{files[0].name}</div>
            <NormalButton
              className="button-danger px-5 font-12 background-none border-none text-black"
              label={t("common.button.change_video")}
              handleClick={open}
            />
          </div>
        </div>
      ) : (
        <section
          className={`container w-260-px h-458-px ${styles.containerBasicUpload}`}
        >
          <div {...getRootProps({ className: "dropzone text-black" })}>
            <input {...getInputProps()} />
            <p>Drag n drop some files here, or click to select files</p>
            <NormalButton
              className="button-danger px-20"
              label={t("common.button.select_file")}
              handleClick={open}
            />
          </div>
          {fileRejectionItems}
        </section>
      )}
    </>
  );
}
export default UploadImageBasic;
