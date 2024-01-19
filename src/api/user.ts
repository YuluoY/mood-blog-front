import { IRest } from "@/types/api/rest.ts"
import request from "@/utils/request.ts"
import { IBaseApi } from "@/types/core/index.ts";

const prefix = '/user'

export const login: IRest['login'] = (data) => request.get(`${prefix}/login`, data)

export const register: IRest['register'] = (data) => request.post(`${prefix}/register`, data)


export const addUser: IBaseApi['add'] = (data) => {
  return request.post(`${prefix}/add`, data);
};

export const updateUser: IBaseApi['update'] = (id, data) => {
  return request.putch(`${prefix}/update/${id}`, data || {});
}

export const getUser: IBaseApi['getAll'] = () => {
  return request.get(`${prefix}/all`)
}

export const getUserById:IBaseApi['getById'] = (data) => {
  return request.get(`${prefix}/getById`, data)
}

export const removeUser: IBaseApi['remove'] = (id) => {
  return request.delete(`${prefix}/remove`, { id })
}

export const getUsersByPage: IBaseApi['paination'] = (page, limit, data) => {
  return request.get(`${prefix}/pagination/${page}/${limit}`, data || {});
}