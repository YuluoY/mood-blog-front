import { MTableBaseMap } from "@/components/global/MTable/types/index.ts";
import { IArticle } from "@/types/api/article.ts";
import { restoreArticle, removeArticle, updateArticle } from "@/api/article.ts";
import { ElNotification } from "element-plus";
import { useFilterBaseData } from "./useFilterBaseData.ts";


export const useFilterArticleTable = (tableData: IArticle | IArticle[]) => {

  const { data, baseTableMap, delSwitchChange } = useFilterBaseData<IArticle>(tableData)

  // 软硬删除的switch状态切换
  delSwitchChange(async (row: IArticle & { switchStatus?: boolean }) => {
    if (row.switchStatus) {
      const res = await restoreArticle(row.id);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: `文章"${row.title}"已启用！`,
        })
      }
    } else {
      const res = await removeArticle(row.id);
      if (res.success) {
        ElNotification({
          type: 'warning',
          message: `文章"${row.title}"被禁用！`
        })
      }
    }
  })

  const articleStatusMap = {
    0: '正常',
    1: '禁用',
    3: '审核',
    4: '私密',
    5: '密码',
    6: '草稿'
  }

  interface IArticleExtraProp {
    visibility: string  // 可见
  }

  const filterTableData = reactive(data.map((item: IArticle & Partial<IArticleExtraProp>) => {
    item.author = item.user.username;
    // @ts-ignore
    item.visibility = articleStatusMap[item.status]
    item.isTop = ref(item.isTop);
    item.isRecommend = ref(item.isRecommend)
    return item;
  }));

  const articleTableMap: Partial<MTableBaseMap<keyof (IArticle & IArticleExtraProp)>>[] = [
    { prop: 'id', label: 'id' },
    { prop: 'author', label: '作者' },
    { prop: 'title', label: '标题' },
    { prop: 'cover', label: '封面', type: 'image' },
    { prop: 'words', label: '字数' },
    { prop: 'visibility', label: '可见性' },
    {
      prop: 'isTop', label: '置顶', type: 'switch', ondelSwitchChange: async (row: IArticle) => {
        const res = await updateArticle<Partial<IArticle>, any>(row.id, { isTop: row.isTop });
        if (res.success) {
          ElNotification({
            type: 'success',
            message: `文章《${row.title}》${row.isTop ? '置顶成功！' : '已取消置顶！'}`
          })
        }
      }
    },
    {
      prop: 'isRecommend', label: '推荐', type: 'switch', ondelSwitchChange: async (row: IArticle) => {
        const res = await updateArticle<Partial<IArticle>, any>(row.id, { isRecommend: row.isRecommend });
        if (res.success) {
          ElNotification({
            type: 'success',
            message: `文章《${row.title}》${row.isRecommend ? '推荐成功！' : '已取消推荐！'}`
          })
        }
      }
    },
    ...baseTableMap,
  ]


  return {
    articleTableMap,
    filterTableData
  }
}