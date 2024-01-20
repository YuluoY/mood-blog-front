import { MPaginationProps } from "../../MPagiination/types/index.ts";


export interface MTableBaseMap<T = any> {
  label: string
  prop: T
  visible: true
  type: 'date' | 'text' | 'image' | 'link'
  tip: string
  width: string
  extraLink?: boolean
}
export interface MTableProps<T = any, D = any> extends MPaginationProps {
  isPagination: boolean
  tableData: D[]
  filterTableCol: string  // 根据列名称过滤查询数据
  border: boolean
  stripe: boolean
  columnLabelMap: Partial<MTableBaseMap<T>>[]
}