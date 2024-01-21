import { MTableBaseMap } from "@/components/global/MTable/types/index.ts";
import { IArticle } from "@/types/api/article.ts";
import { restoreArticle, removeArticle } from "@/api/article.ts";
import { ElNotification } from "element-plus";
import { useFilterBaseData } from "./useFilterBaseData.ts";


export const useFilterArticleTable = (tableData: IArticle | IArticle[]) => {

  const { data, baseTableMap, switchChange } = useFilterBaseData<IArticle>(tableData)

  switchChange(async (row: IArticle & { switchStatus?: boolean }) => {
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

  const filterTableData = reactive(data.map((item) => {
    item.author = item.user.username;

    return item;
  }));

  const articleTableMap: Partial<MTableBaseMap<keyof IArticle>>[] = [
    { prop: 'id', label: 'id' },
    { prop: 'author', label: '作者' },
    { prop: 'title', label: '标题' },
    { prop: 'cover', label: '封面', type: 'image' },
    { prop: 'words', label: '字数' },
    ...baseTableMap
  ]


  return {
    articleTableMap,
    filterTableData
  }
}