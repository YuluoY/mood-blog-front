import { defineStore } from 'pinia'
import { IUser } from '@/types/api/user.ts'
import { StoreNames } from './namespace.ts'

export const userStore = defineStore(StoreNames.User, {
  state: () => ({
    id:'',
    username: '',
    bio:'',
    email: '',
    avatar: '',
    role: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    ip:'',
    lastLoginAt:'',
    location:'',
    nickname:'',
    phone:'',
    token:'',
  }),
  getters: {

  },
  actions: {
    setUsername(username: string) {
      this.username = username
    },
    setUser(user: IUser) {
      this.id = user.id
      this.username = user.username
      this.bio = user.bio
      this.email = user.email
      this.avatar = user.avatar
      this.role = user.role
      this.status = user.status as any
      this.createdAt = user.createdAt
      this.updatedAt = user.updatedAt
      this.ip = user.ip
      this.lastLoginAt = user.lastLoginAt
      this.location = user.location
      this.nickname = user.nickname
      this.phone = user.phone
      this.token = user.token
    }
  },
  persist: {
    key: StoreNames.User,
    storage: localStorage,
  },
})
