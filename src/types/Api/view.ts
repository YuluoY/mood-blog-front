import { IResponseBaseData } from "../core/index.ts";

export interface ICreateView {
  userid: string
  visitorId:string
  articleId: string
}

export interface IView extends Partial<IResponseBaseData> {

}