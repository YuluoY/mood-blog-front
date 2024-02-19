import { DatabaseTableName, IBaseApi } from "@/types/core/index.ts";
import request from "@/utils/request.ts";


const prefix = `/${DatabaseTableName.FILE}`

export const addLocalFile: IBaseApi['add'] = (data: File) => {
  const formData = new FormData();
  formData.append('file', data);
  return request.post(`${prefix}/localUpload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

