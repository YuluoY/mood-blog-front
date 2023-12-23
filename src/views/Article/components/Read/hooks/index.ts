import {useArticleStore} from "@/store/articleStore.ts";

export const useArticleRead = () => {
    const router = useRoute();
    const articleStore = useArticleStore();

    const article = articleStore.articleList.filter((item) => item.id === router.params.id)[0];

    return {
        article,
    }
}