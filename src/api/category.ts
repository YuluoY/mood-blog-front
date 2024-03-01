import request from '@/utils/request.ts'
import { IBaseApi } from '@/types/core/index.ts'

const prefix = '/category'

export const addCategory: IBaseApi['add'] = (data) => {
  return request.post(`${prefix}/add`, data)
}

export const updateCategory: IBaseApi['update'] = (id, data) => {
  return request.patch(`${prefix}/update/${id}`, data || {})
}

export const getCategorys: IBaseApi['getAll'] = (query) => {
  return request.get(`${prefix}/all`, query)
}

export const removeCategory: IBaseApi['remove'] = (id, force = false) => {
  return request.delete(`${prefix}/remove`, { id, force })
}

export const restoreCategory: IBaseApi['restore'] = (id) => {
  return request.post(`${prefix}/restore`, { id })
}
