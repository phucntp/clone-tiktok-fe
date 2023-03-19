import {
  initialStateUploadVideo,
  TStateUploadVideo,
} from "@/reducers/uploadVideo";
import { uploadRepositories } from "@/repositories/upload";
import { TRequestUpload } from "@/types/upload";

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

export const uploadServices = {
  uploadVideo,
};
