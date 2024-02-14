import { IRest } from '@/types/api/rest.ts'
import request from '@/utils/request.ts'
import axios from 'axios'

// eslint-disable-next-line no-shadow
// export enum  ApiNamespace {
//   ARTICLE = 'Article',
//   CATEOGRY = 'Category',
//   TAG = 'Tag',
//   USER = 'User',
//   VIEW = 'View'
// }

// export const prefix = '/rest'

export const get: IRest['get'] = (model, unique) => request.get(`/${model}/all`, unique)

export const getCount: IRest['getCount'] = (module) => request.get(`/${module}/count`); 

export const create: IRest['create'] = (model, data) => request.post(`/${model}/add`, data)

export const update: IRest['update'] = (model, id, data) => request.put(`/${model}/${id}`, data)

export const deleteById: IRest['deleteById'] = (model, id) => request.delete(`/${model}`, { id })

export const getList: IRest['getList'] = (model) => request.get(`/${model}`)

export const getListByPage: IRest['getListByPage'] = (model, page, pageSize, query) =>
  request.get(`/${model}/pagination/${page}/${pageSize}`, query)

export const getCode: IRest['getCode'] = () => request.get(`/code`)

export const getQQInfo: IRest['getQQInfo'] = (qqNumber) => axios.get(`https://api.kit9.cn/api/qq_material/api.php?qq=${qqNumber}`)

export const getIp: IRest['getIp'] = () => axios.get('https://api.ipify.org?format=json');

export const getPositionByIp: IRest['getPositionByIp'] = (ip:string) => request.get(`/position/${ip}`)