import { IResponseBaseData } from "../core/index.ts";

export interface ICreateTag {
  tagName: string
  tagColor: string
}


export interface ITag extends Partial<IResponseBaseData>, ICreateTag {

}