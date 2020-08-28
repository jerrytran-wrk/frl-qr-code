export interface PaginationResult<Data> {
  item: Data[];
  pageIndex: number;
  total: number;
}
