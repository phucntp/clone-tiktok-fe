export const convertUrl = (file: any, type = "video/mp4") => {
  const blob = new Blob([file], {
    type: type,
  });
  return URL.createObjectURL(blob);
};
