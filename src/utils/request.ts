/*
 * @Author: huyongle 568055454@qq.com
 * @Date: 2023-11-25 19:48:49
 * @LastEditors: huyongle 568055454@qq.com
 * @LastEditTime: 2023-12-14 23:31:27
 * @FilePath: \mood-blog-front\src\utils\request.ts
 * @Description: 基于axios + qs的请求封装
 *
 * Copyright (c) 2023 by 雨落, All Rights Reserved.
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios'
import Qs from 'qs'
import { ElMessage } from 'element-plus'
import { IResponseTemplate } from '@/types/core/index.ts'
import { useUserStore } from '@/store/userStore.ts'

export default new (class Request {
  public instance: AxiosInstance

  private readonly defaultConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true, // 跨域请求时发送 cookies
    // paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
  }

  constructor(options?: AxiosRequestConfig) {
    this.defaultConfig = Object.assign(this.defaultConfig, options)
    this.instance = axios.create(this.defaultConfig)
    this.initInterceptors()
  }

  public initInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // qs针对预检请求的处理
        if (config.method === 'post' && config.data instanceof Object) {
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
          config.data = Qs.stringify(config.data)
        }
        if (useUserStore().csrf_token) (config.headers['x-csrf-token'] = useUserStore().csrf_token)
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MDhiOTViLWE2NDEtNGMxMC05MmZhLTYzOTRlYzA5OTlmZSIsInVzZXJuYW1lIjoieXVsdW8iLCJlbWFpbCI6IjU2ODA1NTQ1NEBxcS5jb20iLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTcwMTc5OTg1OCwiZXhwIjo4NjQwMDE3MDE3MTM0NTh9.74Mv71OT_EUGUSjEhkULOe60g8AdosOhWycGOLwheOA'}`
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data.code !== 200) ElMessage.error(response.data.message);
        return Promise.resolve(response.data)
      },
      (error) => {
        const { data } = error.response.data as IResponseTemplate<string>;
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 400:
              ElMessage.error(data)
              break
            case 401:
              ElMessage.error('登录状态失效，请重新登录')
              localStorage.removeItem('token')
              break
            case 403:
              ElMessage.error('拒绝访问')
              break
            case 404:
              ElMessage.error('请求错误，未找到该资源')
              break
            case 405:
              ElMessage.error('请求方法未允许')
              break
            case 408:
              ElMessage.error('请求超时')
              break
            case 413:
              ElMessage.error('上传文件过大')
              break
            case 422:
              ElMessage.error('参数错误')
              break
            case 429:
              ElMessage.error('请求次数超限')
              break
            case 500:
              ElMessage.error('服务端错误')
              break
            default:
              ElMessage.error(`连接错误${error.response.status}`)
          }
        } else {
          ElMessage.error('连接到服务器失败')
        }

        return Promise.reject(error.response)
      }
    )
  }

  public get<T>(url: string, params?: object): Promise<any> {
    return this.instance.get<T>(url, { params })
  }

  public post<T>(url: string, data?: object): Promise<any> {
    return this.instance.post<T>(url, data)
  }

  public put<T>(url: string, data?: object): Promise<any> {
    return this.instance.put<T>(url, data)
  }

  public patch<T>(url: string, data?: object): Promise<any> {
    return this.instance.patch<T>(url, data)
  }

  public delete<T>(url: string, params?: object): Promise<any> {
    return this.instance.delete<T>(url, { params })
  }
})()