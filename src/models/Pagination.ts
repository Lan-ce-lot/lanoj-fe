/**
 * @FileName: pagination
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 14:59
 */

export interface PaginationProps {
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  current: number;
  total: number;
  pageSize: number;
}

export interface IPageQuery {
  current?: number;
  pageSize?: number;
}

export interface PageModel {
  records: any[];
  total: number;
  size: number;
  current: number;
  pages: number;
  orders?: any[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  countId?: null;
  maxLimit?: null;
}


