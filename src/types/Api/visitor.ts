import { IResponseBaseData } from "../core/index.ts";

export interface ICreateVisitor {
  ip: string;
  browser: string;
  windowsOS: string;
  address: string;
  country: string;
  province: string;
  city: string;
  district: string;
  street: string;
  point: {
    x: string;
    y: string;
  };
  adcode: string;
}

export interface IVisitor extends ICreateVisitor, IResponseBaseData {
  count: number
}