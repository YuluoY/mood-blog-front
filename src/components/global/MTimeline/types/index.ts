export interface MTimelineItemPoint {
  width: number | string
  height?: number | string
  color: string
  position?: 'top' | 'center' | 'bottom'
}

export interface MTimelineItem {
  [key: string]: any

  title: string
  year: string | number
  month: string | number
  day: string | number
  description: string

  weekend?: string
  cover?: string
  date?: string
  author?: string
  avatar?: string
  likeCount?: string | number
  viewCount?: string | number
  commentCount?: string | number
}



export interface MTimelineItemProps {
  item: MTimelineItem
  order: 'ASC' | 'DESC'
}

export interface MTimelineProps {
  data: MTimelineItem[]
  total: string | number
  point: MTimelineItemPoint
  order: 'ASC' | 'DESC'
}