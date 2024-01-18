import { MPaginationProps } from "../../MPagiination/types/index.ts";

export interface MTableProps extends MPaginationProps {
  isPagination: boolean
  isSearch: boolean
  searchText: string
  tableData: object[]
  filterTableCol: string  // 根据列名称过滤查询数据
  border: boolean
  stripe: boolean
  columnLabel: {
    label: string
    prop: string
  }[]
}