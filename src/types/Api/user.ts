import { EnumRole, EnumStatus, IResponseBaseData } from '@/types/core/index.ts'

// 定义UserLogin
export interface IUserLogin {
  username?: string // 用户名
  phone?: string // 手机号
  email?: string // 邮箱
  password: string // 密码  
  expire?: number // 过期时间
  csrf_token?: string // csrf_token
}

export interface IUserSocializes {
  [key: string]: string
}

// 定义UserRegister
export interface IUserRegister extends IUserLogin {
  nickname?: string // 昵称
  avatar?: string // 头像
  cover?: string // 封面
  status: EnumStatus // 状态
  bio?: string // 描述
  role: EnumRole // 角色
  socializes?: IUserSocializes // 网站
  location?: string // 地址
  ip?: string // IP
  windowsOS?: string
  browser?: string
  province?: string
  city?: string
  district?: string
  street?: string
  userAgent?: string // 浏览器
  lastLoginAt?: string // 最后登录
}

// 定义User
export interface IUser extends Partial<IResponseBaseData>, IUserRegister {
  [key: string]: any
  token: string // token
}

export interface IUserForm {
  [key: string]: string;
  unique: string
  password: string
  code: string
}