export const convertUrl = (file: any) => {
  return window.URL.createObjectURL(new Blob([file]));
};
