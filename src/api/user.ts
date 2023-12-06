import { IRest } from "@/types/api/rest.ts"
import request from "@/utils/request.ts"

const prefix = '/user'

export const login: IRest['login'] = (data) => request.get(`${prefix}/login`, data)

export const register: IRest['register'] = (data) => request.post(`${prefix}/register`, data)