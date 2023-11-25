import { AxiosResponse } from 'axios'
import { DatabaseTableName, IPaginationResponse, IResponseTemplate } from '../core/index.ts'

// rest common CRUD
export declare interface IRest {
  // 通过唯一值获取
  get<T>(model: DatabaseTableName, unique: Object): Promise<AxiosResponse<IResponseTemplate<T>>>
  // 创建
  create<D extends Object, T>(model: DatabaseTableName, data: D): Promise<AxiosResponse<IResponseTemplate<T>>>
  // 更新
  update<D extends Object, T>(
    model: DatabaseTableName,
    id: number | string,
    data: D
  ): Promise<AxiosResponse<IResponseTemplate<T>>>
  // 删除
  deleteById<T>(
    model: DatabaseTableName,
    id: number | number[] | string | string[]
  ): Promise<AxiosResponse<IResponseTemplate<T>>>
  // 获取列表
  getList<T>(model: DatabaseTableName): Promise<AxiosResponse<IResponseTemplate<T>>>
  // 分页
  getListByPage<T>(
    model: DatabaseTableName,
    page: number | string,
    pageSize: number | string
  ): Promise<AxiosResponse<IResponseTemplate<IPaginationResponse<T>>>>
}
