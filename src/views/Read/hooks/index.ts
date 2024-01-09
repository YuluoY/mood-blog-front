import { useArticleStore } from "@/store/articleStore.ts";

export const useArticleRead = () => {
    const route = useRoute();
    const articleStore = useArticleStore();

    const article = articleStore.articleList.filter((item) => item.id === route.params.id)[0];


    return {
        article: computed(() => article),
    }
}