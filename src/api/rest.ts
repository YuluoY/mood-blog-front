import { IRest } from '@/types/api/rest.ts'
import request from '@/utils/request.ts'
import axios from 'axios'

export const prefix = '/rest'

export const get: IRest['get'] = (model, unique) => request.get(`${prefix}/${model}`, unique)

export const create: IRest['create'] = (model, data) => request.post(`${prefix}/${model}`, data)

export const update: IRest['update'] = (model, id, data) => request.put(`${prefix}/${model}/${id}`, data)

export const deleteById: IRest['deleteById'] = (model, id) => request.delete(`${prefix}/${model}`, { id })

export const getList: IRest['getList'] = (model) => request.get(`${prefix}/${model}`)

export const getListByPage: IRest['getListByPage'] = (model, page, pageSize) =>
  request.get(`${prefix}/${model}/pagation/${page}/${pageSize}`)

export const getCode: IRest['getCode'] = () => request.get(`/code`)

export const getQQInfo: IRest['getQQInfo'] = (qqNumber) => axios.get(`https://api.kit9.cn/api/qq_material/api.php?qq=${qqNumber}`)

