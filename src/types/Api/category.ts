/* eslint-disable import/no-cycle */
import { IResponseBaseData } from "../core/index.ts";
import { IArticle } from "./article.ts";

export interface ICreateCategory {
  cateName: string
  cateColor: string
  cateAlias: string
  article?: IArticle[]
}

export interface ICategory extends ICreateCategory, Partial<IResponseBaseData> {

}

