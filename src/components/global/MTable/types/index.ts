import { MPaginationProps } from "../../MPagiination/types/index.ts";


export interface MTableBaseMap<T = any> {
  label: string
  prop: T
  visible: true
  type: 'date' | 'text' | 'image' | 'link' | 'switch'
  tip: string
  width: string
  extraLink?: boolean
  swtichStatus: Ref<boolean>
  onSwitchChange: (row: any) => void
}
export interface MTableProps<T = any, D = any> extends MPaginationProps {
  isPagination: boolean
  tableData: D[]
  border: boolean
  stripe: boolean
  columnLabelMap: Partial<MTableBaseMap<T>>[]
}