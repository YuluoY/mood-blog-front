import { IResponseBaseData } from "../core/index.ts";

export interface ICreateComment {
  content: string
  nickname: string
  qq: string
  avatar: string
  email: string
  website: string
  isSubscribe: boolean
  isTop?: false

  user?: Partial<import('./user.ts').IUser>
  visitor?: Partial<import('./visitor.ts').IVisitor>
  article?: Partial<import('./article.ts').IArticle>
  parent?: Partial<import('@/types/api/comment.ts').IComment>
  reply?: Partial<import('@/types/api/comment.ts').IComment>
}

export interface IComment extends Partial<ICreateComment>, IResponseBaseData {
  children?: import('@/types/api/comment.ts').IComment[]
  isReply?: boolean
}