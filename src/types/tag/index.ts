export type TTag = {
  _id: string;
  name: string;
  url: string;
  content: string;
};

export type TResListTag = TTag[];
export type TReqListTag = {
  page?: number;
  limit?: number;
};
export type TReqTag = {
  id?: string;
};
