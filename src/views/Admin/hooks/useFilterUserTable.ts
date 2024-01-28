import { MTableBaseMap } from "@/components/global/MTable/types/index.ts";
import { IUser } from "@/types/api/user.ts";
import { dateFormat } from "@/utils/dayjs.ts";

export const useFilterUserTable = (tableData: IUser[]) => {

  const filterTableData = reactive([]);

  // 字段中文意思映射
  const userTableMap: Partial<MTableBaseMap<keyof IUser>>[] = [
    { prop: 'id', label: 'id' },
    { prop: 'username', label: '用户名' },
    { prop: 'avatar', label: '头像', type: 'image', width: '80' },
    { prop: 'email', label: '邮箱', width: '200' },
    { prop: 'role', label: '权限', tip: 'superAdmin,admin,vipUser,user,visitor', width: '100' },
    { prop: 'status', label: '状态', tip: '0:正常,1:禁用,2:审核,3:私密,4:密码,5:草稿', width: '80' },
    { prop: 'createdAt', label: '创建时间', tip: '用户创建账号日期', width: '180' },
    { prop: 'lastLoginAt', label: '登录时间', type: 'date', tip: '最后登录时间', width: '180' }
  ]

  const statusMap = {
    0: '正常',
    1: '禁用',
    2: '删除',
    3: '审核'
  }


  // 数据清洗
  if (tableData.length) {
    filterTableData.push(...tableData.map((user: IUser) => {
      user.lastLoginAt = dateFormat(user.lastLoginAt);
      user.createdAt = dateFormat(user.createdAt);
      user.updatedAt = dateFormat(user.updatedAt);
      if (user.deletedAt) {
        user.deletedAt = dateFormat(user.deletedAt);
      }
      // @ts-ignore
      user.status = statusMap[user.status];
      return user;
    }))
  }


  return {
    userTableMap,
    filterTableData
  }

}