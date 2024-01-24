import request from "@/utils/request.ts"
import { IBaseApi } from "@/types/core/index.ts";

const prefix = '/tag'

export const addTag: IBaseApi['add'] = (data) => {
  return request.post(`${prefix}/add`, data);
};

export const updateTag: IBaseApi['update'] = (id, data) => {
  return request.patch(`${prefix}/update/${id}`, data || {});
}

export const getTags: IBaseApi['getAll'] = () => {
  return request.get(`${prefix}/all`)
}

export const removeTag: IBaseApi['remove'] = (id, force = false) => {
  return request.delete(`${prefix}/remove`, { id, force })
}

export const restoreTag: IBaseApi['restore'] = (id) => {
  return request.post(`${prefix}/restore`, { id })
}

export const getTagByPage: IBaseApi['pagination'] = (page, limit, query) => {
  return request.get(`${prefix}/pagination/${page}/${limit}`, query)
}