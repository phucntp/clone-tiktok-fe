export type TNews = {
  _id: string;
  title: string;
  url: string;
  music: string;
  description: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  users_like: string[];
  users_share: string[];
  comments: string[];
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  loaded?: boolean;
};

export type TResListNews = TNews[];

export type TUrlVideo = {
  id: string;
  url: string;
};
