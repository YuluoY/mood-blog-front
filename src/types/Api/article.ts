/* eslint-disable import/no-cycle */
import { EnumStatus, IResponseBaseData } from "../core/index.ts"
import { ICategory } from "./category.ts"
import { ILike } from "./like.ts"
import { ITag } from "./tag.ts"
import { IUser } from "./user.ts"
import { IView } from "./view.ts"


interface IExractArticle {
  views: IView[],
  likes: ILike[],
  category: ICategory,
  comments: any[],
  file: any[],
  tags: ITag[]
}

interface IBaseArticle {
  title: string
  content: string
  cover: string
  description: string,
  status: EnumStatus,
  words: number
  author?: string
  isRecommend: boolean | Ref<boolean> // 推荐
  isTop: boolean | Ref<boolean>   // 置顶
  isOriginal?: boolean | Ref<boolean> // 是否原创
  isComment?:boolean | Ref<boolean> // 是否开启评论区
}

export interface ICreateArticle extends Partial<IExractArticle>, Partial<IBaseArticle> {
  userId: string,
}

export interface IArticle extends ICreateArticle, Partial<IResponseBaseData> {
  user: IUser,
}