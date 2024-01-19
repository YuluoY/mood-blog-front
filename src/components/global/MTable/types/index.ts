import { MPaginationProps } from "../../MPagiination/types/index.ts";

export interface MTableProps extends MPaginationProps {
  isPagination: boolean
  isSearch: boolean
  tableData: object[]
  filterTableCol: string  // 根据列名称过滤查询数据
  border: boolean
  stripe: boolean
  columnLabel: Partial<{
    label: string
    prop: string
    visible: boolean
    type: 'date' | 'text'
  }>[]
}