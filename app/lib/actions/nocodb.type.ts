export type BaseEntity = {
  Id: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type PageInfo = {
  totalRows: number;
  page: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
};
