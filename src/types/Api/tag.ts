import { IResponseBaseData } from "../core/index.ts";

export interface ITag extends Partial<IResponseBaseData> {
  tagName: string
}