import request from "@/utils/request.ts"
import { IBaseApi } from "@/types/core/index.ts";

const prefix = '/article'

export const addArticle: IBaseApi['add'] = (data) => {
  return request.post(`${prefix}/add`, data);
};

export const updateArticle: IBaseApi['update'] = (id, data) => {
  return request.patch(`${prefix}/update/${id}`, data || {});
}

export const getArticles: IBaseApi['getAll'] = () => {
  return request.get(`${prefix}/all`)
}

export const removeArticle: IBaseApi['remove'] = (id, force) => {
  return request.delete(`${prefix}/remove`, { id, force })
}

export const restoreArticle: IBaseApi['restore'] = (id) => {
  return request.post(`${prefix}/restore`, { id })
}

export const getArticlesByPage: IBaseApi['pagination'] = (page, limit, data) => {
  return request.get(`${prefix}/pagination/${page}/${limit}`, data || {});
}