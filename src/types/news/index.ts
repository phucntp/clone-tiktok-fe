export type TNews = {
  _id: string;
  title: string;
  url: string;
  music: string;
  description: string;
  isLike: string;
  following: string;
  countLike: number;
  count: number;
  users: string[];
  comments: string[];
  author: string;
};

export type TResListNews = TNews[];
