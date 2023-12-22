import { IArticle } from "../api/article.ts"

export interface IArticleStoreState {
  [key:string]: any
  default: {
    page: number
    limit: number
  }
  articleList: IArticle[]
  total: number
  page: number
  limit: number
}