import { getArticlesByPage } from "@/api/article.ts"
import { IArticle } from "@/types/api/article.ts";
import { ElMessage } from "element-plus";
import { useArticleStore } from '@/store/articleStore.ts'
import { useUserStore } from "@/store/userStore.ts";
import { dateDiffNow } from '@/utils/dayjs.ts'
import { useMainStore } from "@/store/mainStore.ts";

export const useHome = async () => {

    let page = 1;
    let limit = 5;
    const { t } = useI18n();
    const articleStore = useArticleStore();
    const mainStore = useMainStore();
    const router = useRouter();

    if (useUserStore().id) {
        await articleStore.fetchArticlesByPage<IArticle>(page, limit);
    }

    const onLoadMore = async () => {
        page += 1;
        const { data, success, message } = await getArticlesByPage<IArticle>(page, limit, {
            sort: 'createdAt',
            order: 'DESC'
        });
        if (success) {
            articleStore.articleList.push(...data.list);
        } else {
            ElMessage.error(message || t('homeView.loadMoreArticleError'))
        }
    }

    const onViewArticle = (article: IArticle) => {
        console.log(article);
        router.push({
            name: 'ArticleRead',
            params: {
                id: article.id
            }
        })
    }


    // sidebar
    setInterval(() => {
        mainStore.sidebar.loveTime = dateDiffNow('2022-11-30 13:14:00');
    }, 100)

    return {
        // home list
        dataList: computed(() => articleStore.articleList),
        total: computed(() => articleStore.total),

        onLoadMore,
        onViewArticle
    }
}