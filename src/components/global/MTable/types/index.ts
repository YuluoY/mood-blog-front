import { MPaginationProps } from "../../MPagiination/types/index.ts";


export interface MTableBaseMap<T = any> {
  label: string
  prop: T
  visible: true
  type: 'date' | 'text' | 'image' | 'link' | 'delSwitch' | 'switch' | 'dialog'
  tip: string
  width: string
  extraLink?: boolean
  onDelSwitchChange: (row: any) => void
  onSwitchChange: (row: any) => void
  onDialogClick: (row: any) => void
}
export interface MTableProps<T = any, D = any> extends MPaginationProps {
  isPagination: boolean
  tableData: D[]
  border: boolean
  stripe: boolean
  columnLabelMap: Partial<MTableBaseMap<T>>[]
}