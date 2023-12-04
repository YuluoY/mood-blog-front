// 规定请求响应模板
export declare interface IResponseTemplate<T> {
  code: number
  data: T
  message: string
}

// 定义响应数据基本字段
export declare interface IResponseBaseData {
  id: number | string
  createdAt: string
  updatedAt: string
}

// 状态
// eslint-disable-next-line no-shadow
export declare const enum EnumStatus {
  Normal, // 正常
  Disabled, // 禁用
  Deleted, // 删除
  UnAudit, // 审核中
}

// 角色
// eslint-disable-next-line no-shadow
export declare const enum EnumRole {
  SuperAdmin = 'superAdmin', // 超级管理员
  Admin = 'admin', // 管理员
  User = 'user', // 普通用户
  VipUser = 'vipUser', // VIP用户
}

// 主题
// eslint-disable-next-line no-shadow
export declare const enum EnumTheme {
  Dark = 'dark',
  Light = 'light',
}

// 语言
// eslint-disable-next-line no-shadow
export declare const enum EnumLang {
  Zh = 'zh',
  En = 'en',
}

// eslint-disable-next-line no-shadow
export declare const enum DatabaseTableName {
  User = 'user',
  Article = 'article',
  Tag = 'tag',
  Category = 'category',
  Comment = 'comment',
  Role = 'role',
  Like = 'like',
  Router = 'router',
}

// pagation 分页
export declare interface IPaginationRequest {
  page: number
  pageSize: number
}
export declare interface IPaginationResponse<T> extends IPaginationRequest {
  total: number
  data: T[]
}
