import { IRest } from '@/types/api/rest.ts'
import request from '@/utils/request.ts'

export const prefix = '/rest'

export const get: IRest['get'] = (model, unique) => request.get(`${prefix}/${model}`, unique)

export const create: IRest['create'] = (model, data) => request.post(`${prefix}/${model}`, data)

export const update: IRest['update'] = (model, id, data) => request.put(`${prefix}/${model}/${id}`, data)

export const deleteById: IRest['deleteById'] = (model, id) => request.delete(`${prefix}/${model}`, { id })

export const getList: IRest['getList'] = (model) => request.get(`${prefix}/${model}`)

export const getListByPage: IRest['getListByPage'] = (model, page, pageSize) =>
  request.get(`${prefix}/${model}/pagation/${page}/${pageSize}`)

export const getCode: IRest['getCode'] = () => request.get(`${prefix}/code`)

export const login: IRest['login'] = (data) => request.post(`${prefix}/login`, data)

export const register: IRest['register'] = (data) => request.post(`${prefix}/register`, data)
