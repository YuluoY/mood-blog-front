import { EnumStatus, IResponseBaseData } from "../core/index.ts"
import { IUser } from "./user.ts"

interface IExractArticle {
  view: number,
  like: number,
  category: any[],
  comment: any[],
  file: any[],
}

interface IBaseArticle {
  title: string
  content: string
  cover: string
  description: string,
  status: EnumStatus,
}

export interface ICreateArticle extends Partial<IExractArticle>, IBaseArticle {
  userId: string,
}

export interface IArticle extends ICreateArticle, IResponseBaseData {
  user: IUser,
}
