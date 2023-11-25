import { EnumRole, EnumStatus, IResponseBaseData } from '@/types/core/index.ts'

// 定义User
export declare interface IUser extends IResponseBaseData {
  username: string // 用户名
  password: string // 密码
  nickname: string // 昵称
  avatar: string // 头像
  email: string // 邮箱
  phone: string // 手机号
  status: EnumStatus // 状态
  description: string // 描述
  roles: EnumRole // 角色
  token: string // token
}

// 定义UserLogin
export declare interface IUserLogin {
  username?: string // 用户名
  phone?: string // 手机号
  email?: string // 邮箱
  password: string // 密码
}

// 定义UserRegister
export declare interface IUserRegister {
  username: string // 用户名
  password: string // 密码
  nickname?: string // 昵称
  avatar?: string // 头像
  email: string // 邮箱
  phone?: string // 手机号
  status: EnumStatus // 状态
  description?: string // 描述
  roles: EnumRole // 角色
}
