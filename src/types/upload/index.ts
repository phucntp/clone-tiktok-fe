export type TRequestUpload = FormData;

export type TResUpload = {
  url: string;
};

export type TReqGetFile = {
  filename: string;
};

export type TFile = {
  url: string;
  id: string;
};

export type TResGetFile = TFile[];
