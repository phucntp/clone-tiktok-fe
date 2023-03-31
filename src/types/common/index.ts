export type TMessage = {
  isError?: boolean;
  message: string;
};

export type TPagination = {
  total: number;
  limit: number;
  currentPage: number;
  totalPage: number;
};
