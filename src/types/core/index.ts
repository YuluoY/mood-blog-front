// 规定请求响应模板
export interface IResponseTemplate<T> {
  code: number
  data: T
  success: boolean
  message?: string
}

// 定义响应数据基本字段
export interface IResponseBaseData {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

// 状态
// eslint-disable-next-line no-shadow
export const enum EnumStatus {
  Normal, // 正常
  Disabled, // 禁用
  UnAudit, // 审核中
  Private, // 私密
  Draft, // 草根
}

// 角色
// eslint-disable-next-line no-shadow
export const enum EnumRole {
  SuperAdmin = 'superAdmin', // 超级管理员
  Admin = 'admin', // 管理员
  User = 'user', // 普通用户
  VipUser = 'vipUser', // VIP用户
  Visitor = 'visitor', // 游客
}

export type TypeRole = 'superAdmin' | 'admin' | 'user' | 'vipUser' | 'visitor'

// 主题
// eslint-disable-next-line no-shadow
export const enum EnumTheme {
  Dark = 'dark',
  Light = 'light',
}

// 语言
// eslint-disable-next-line no-shadow
export const enum EnumLang {
  Zh = 'zh',
  En = 'en',
}

// eslint-disable-next-line no-shadow
export const enum DatabaseTableName {
  USER = 'user',
  ARTICLE = 'article',
  TAG = 'tag',
  CATEGORY = 'category',
  COMMENT = 'comment',
  LIKE = 'like',
  VIEW = 'view',
  VISITOR = 'visitor',
  FILE = 'file'
}

// pagation 分页
export interface IPaginationRequest {
  page: number
  limit: number
}
export interface IPaginationResponse<T> extends IPaginationRequest {
  [x: string]: number
  total: number
  list: T[]
}

export interface IQueryFindManyOptions<T = any> extends Partial<IResponseBaseData> {
  sort?: string
  order?: 'ASC' | 'DESC'
  withDeleted?: boolean
  where?: T
  relations?: DatabaseTableName[keyof DatabaseTableName][]
}
export interface IBaseApi {
  add: <T = any, D = any>(data: T & File & object) => Promise<IResponseTemplate<D | T>>
  getAll?: <T>() => Promise<IResponseTemplate<T>>
  getById?: <T = any, D = any>(data: T & object) => Promise<IResponseTemplate<D>>
  update?: <T, D>(id: string, data: T & object) => Promise<IResponseTemplate<T | D>>
  remove: <T>(id: string | string[], force?: boolean) => Promise<IResponseTemplate<T>>
  restore: <T>(id: string | string[]) => Promise<IResponseTemplate<T>>
  pagination: <T>(page: number, limit: number, query?: Partial<IQueryFindManyOptions<Partial<T>>>) => Promise<IResponseTemplate<IPaginationResponse<T>>>
}

export interface IBaiduMapPosition {
  address: string
  country: string
  province: string
  city: string
  district: string
  street: string
  point: { x: string, y: string },
  adcode: string
}