import { EnumRole, EnumStatus, IResponseBaseData } from '@/types/core/index.ts'

// 定义UserLogin
export declare interface IUserLogin {
  username?: string // 用户名
  phone?: string // 手机号
  email?: string // 邮箱
  password: string // 密码
}

// 定义UserRegister
export declare interface IUserRegister extends IUserLogin {
  nickname?: string // 昵称
  avatar?: string // 头像
  status: EnumStatus // 状态
  bio?: string // 描述
  role: EnumRole // 角色
  website?: string // 网站
  location?: string // 地址
  ip?: string // IP
  userAgent?: string // 浏览器
  lastLoginAt?: string // 最后登录
}

// 定义User
export declare interface IUser extends IResponseBaseData, IUserRegister {
  [key: string]: any
  token: string // token
}
