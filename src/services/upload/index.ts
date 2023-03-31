import { initStateImage, TStateImage } from "@/reducers/getImage";
import { initStateVideo, TStateVideo } from "@/reducers/getVideo";
import {
  initialStateUploadImage,
  TStateUploadImage,
} from "@/reducers/uploadImage";
import {
  initialStateUploadVideo,
  TStateUploadVideo,
} from "@/reducers/uploadVideo";
import { uploadRepositories } from "@/repositories/upload";
import { TFile, TRequestUpload } from "@/types/upload";
import { convertUrl } from "@/utils/common/file";

const uploadVideo = async (
  data: TRequestUpload
): Promise<TStateUploadVideo> => {
  const res = await uploadRepositories.uploadVideo(data);
  if (!res || !res?.data) {
    return {
      ...initialStateUploadVideo,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const getVideo = async (data: TFile): Promise<TStateVideo> => {
  const res = await uploadRepositories.getVideo(data.url, {
    responseType: "blob",
  });
  if (!res || !res?.data) {
    return {
      ...initStateVideo,
      hasError: true,
    };
  }
  return {
    ...initStateVideo,
    hasError: false,
    data: { url: convertUrl(res.data), id: data.id },
  };
};

const uploadImage = async (
  data: TRequestUpload
): Promise<TStateUploadImage> => {
  const res = await uploadRepositories.uploadImage(data);
  if (!res || !res?.data) {
    return {
      ...initialStateUploadImage,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const getImage = async (data: TFile): Promise<TStateImage> => {
  const res = await uploadRepositories.getImage(data.url, {
    responseType: "blob",
  });
  if (!res || !res?.data) {
    return {
      ...initStateImage,
      hasError: true,
    };
  }
  return {
    ...initStateImage,
    hasError: false,
    data: { url: convertUrl(res.data, "image/*"), id: data.id },
  };
};

export const uploadServices = {
  uploadVideo,
  getVideo,
  getImage,
  uploadImage,
};
