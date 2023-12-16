import { DatabaseTableName, IPaginationResponse, IResponseTemplate } from '../core/index.ts'

// rest common CRUD
export interface IRest {
  // 通过唯一值获取
  get<T>(model: DatabaseTableName, unique: Object): Promise<IResponseTemplate<T>>
  // 创建
  create<D extends Object, T>(model: DatabaseTableName, data: D): Promise<IResponseTemplate<T>>
  // 更新
  update<D extends Object, T>(model: DatabaseTableName, id: number | string, data: D): Promise<IResponseTemplate<T>>
  // 删除
  deleteById<T>(model: DatabaseTableName, id: number | number[] | string | string[]): Promise<IResponseTemplate<T>>
  // 获取列表
  getList<T>(model: DatabaseTableName): Promise<IResponseTemplate<T>>
  // 分页
  getListByPage<T>(
    model: DatabaseTableName,
    page: number | string,
    pageSize: number | string
  ): Promise<IResponseTemplate<IPaginationResponse<T>>>

  // 验证码
  getCode(): Promise<IResponseTemplate<string>>

  // 登录
  login<D extends Object, T>(data: D): Promise<IResponseTemplate<T>>

  // 注册
  register<D extends Object, T>(data: D): Promise<IResponseTemplate<T>>
}
