import { IRest } from '@/types/Api/rest.ts'
import request from '@/utils/request.ts'

export const prefix = '/rest'

export const get: IRest['get'] = (model, unique) => {
  return request.get(`${prefix}/${model}`, unique)
}

export const create: IRest['create'] = (model, data) => {
  return request.post(`${prefix}/${model}`, data)
}

export const update: IRest['update'] = (model, id, data) => {
  return request.put(`${prefix}/${model}/${id}`, data)
}

export const deleteById: IRest['deleteById'] = (model, id) => {
  return request.delete(`${prefix}/${model}`, { id })
}

export const getList: IRest['getList'] = (model) => {
  return request.get(`${prefix}/${model}`)
}

export const getListByPage: IRest['getListByPage'] = (model, page, pageSize) => {
  return request.get(`${prefix}/${model}/pagation/${page}/${pageSize}`)
}
