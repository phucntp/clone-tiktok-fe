export type TMusic = {
  _id: string;
  name: string;
  url: string;
  description: string;
};

export type TResListMusic = TMusic[];
export type TReqListMusic = {
  page?: number;
  limit?: number;
};
export type TReqMusic = {
  id?: string;
};
