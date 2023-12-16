import { getArticlesByPage } from "@/api/article.ts"
import { IArticle } from "@/types/api/article.ts";
import { ElMessage } from "element-plus";


export const useHome = async () => {

  let page = 1;
  let limit = 10;
  const dataList = ref([]);
  const total = ref<number>(0)
  const { t } = useI18n();

  const res = await getArticlesByPage<IArticle>(page, limit);

  dataList.value = res.data.list;
  total.value = res.data.total;

  const onLoadMore = async () => {
    page += 1;
    const { data, success, message } = await getArticlesByPage<IArticle>(page, limit);
    if (success) {
      dataList.value.push(...data.list);
    } else {
      ElMessage.error(message || t('homeView.loadMoreArticleError'))
    }
  }


  return {
    dataList,
    total,

    onLoadMore,
  }
}