import request from "@/utils/request.ts"
import { IResponseTemplate } from "@/types/core/index.ts"

const prefix = '/article'

export const addArticle = <T>(data: T & object): Promise<IResponseTemplate<string>> => request.post(`${prefix}/add`, data)