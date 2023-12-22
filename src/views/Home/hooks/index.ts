import { getArticlesByPage } from "@/api/article.ts"
import { IArticle } from "@/types/api/article.ts";
import { ElMessage } from "element-plus";
import { useArticleStore } from '@/store/articleStore.ts'
import { useUserStore } from "@/store/userStore.ts";


export const useHome = async () => {

  let page = 1;
  let limit = 10;
  const { t } = useI18n();
  const articleStore = useArticleStore();

  if(useUserStore().id) {
    await articleStore.fetchArticlesByPage<IArticle>(page, limit);
  }

  const onLoadMore = async () => {
    page += 1;
    const { data, success, message } = await getArticlesByPage<IArticle>(page, limit);
    if (success) {
      articleStore.articleList.push(...data.list);
    } else {
      ElMessage.error(message || t('homeView.loadMoreArticleError'))
    }
  }

  return {
    dataList: computed(() => articleStore.articleList),
    total: computed(() => articleStore.total),

    onLoadMore,
  }
}