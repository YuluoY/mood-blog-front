import { EnumStatus, IResponseBaseData } from "../core/index.ts"
import { ILike } from "./like.ts"
import { IUser } from "./user.ts"
import { IView } from "./view.ts"

interface IExractArticle {
  views: IView[],
  likes: ILike[],
  category: any[],
  comments: any[],
  file: any[],
}

interface IBaseArticle {
  title: string
  content: string
  cover: string
  description: string,
  status: EnumStatus,
  words: number
}

export interface ICreateArticle extends Partial<IExractArticle>, IBaseArticle {
  userId: string,
}

export interface IArticle extends ICreateArticle, Partial<IResponseBaseData> {
  user: IUser,
}