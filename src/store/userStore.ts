import { defineStore } from 'pinia'
import { IUser, IUserSocializes } from '@/types/api/user.ts'
import { StoreNames } from './namespace.ts'

export const useUserStore = defineStore(StoreNames.User, {
  state: () => ({
    id: '',
    username: '',
    bio: '',
    email: '',
    avatar: 'avatar.jpg',
    cover: 'cover.jpg',
    role: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    ip: '',
    lastLoginAt: '',
    location: '',
    nickname: '',
    phone: '',
    csrfToken: '',
    expire: 0,
    csrf_token: '',
    socializes: {
      GitHub: 'https://github.com/',
      CSDN: 'https://www.csdn.net/',
      ZhiHu: 'https://www.zhihu.com/'
    } as IUserSocializes,
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
      this.cover = user.cover
      this.role = user.role
      this.status = user.status as any
      this.createdAt = user.createdAt
      this.updatedAt = user.updatedAt
      this.ip = user.ip
      this.lastLoginAt = user.lastLoginAt
      this.location = user.location
      this.nickname = user.nickname
      this.phone = user.phone
      this.csrfToken = user.csrfToken
      this.socializes = user.socializes
      this.expire = Number(user.expire)
      this.csrf_token = user.csrf_token
    },
    initUser() {
      this.id = ''
      this.username = ''
      this.bio = ''
      this.email = ''
      this.avatar = 'avatar.jpg'
      this.cover = 'cover.jpg'
      this.role = ''
      this.status = ''
      this.createdAt = ''
      this.updatedAt = ''
      this.ip = ''
      this.lastLoginAt = ''
      this.location = ''
      this.nickname = ''
      this.phone = ''
      this.csrfToken = ''
      this.expire = 0
      this.socializes = {}
      this.csrf_token = ''
    }
  },
  persist: {
    key: `mood-${StoreNames.User}`,
    storage: localStorage,
  },
})
