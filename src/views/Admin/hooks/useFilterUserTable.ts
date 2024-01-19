import { IUser } from "@/types/api/user.ts";

export const useFilterUserTable = (tableData: IUser[]) => {
  const UserTableMap: Partial<IUser> = {
    id: 'id',
    username: '用户名',
    email: '联系邮箱',
    ip: 'IP地址',
    location: '居住地',
    lastLoginAt: '登录时间'
  }

  const UserRoleMap = {
    
  }

  
}