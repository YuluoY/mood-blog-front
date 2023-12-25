import { useArticleStore } from "@/store/articleStore.ts";

export const useArticleRead = () => {
    const router = useRoute();
    const articleStore = useArticleStore();
    const parser = new DOMParser();

    const article = articleStore.articleList.filter((item) => item.id === router.params.id)[0];

    const htmlEscape = (str: string): string => {
        if (!str.length) return str;
        return str
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    }

    const generateToc = (content: string) => {
        const nodes = ['h1', 'h2', 'h3'];
        const doc = parser.parseFromString(content, 'text/html');
        const doms = doc.querySelectorAll(nodes.join(','));
        const toc: { id: string, text: string, level: number }[] = [];
        doms.forEach((item) => {
            const level = parseInt(item.tagName[1], 10);
            toc.push({
                anchor: `#${htmlEscape(item.innerText)}`,
                text: item.innerText,
                level
            })
        })
        return toc;
    }

    return {
        article: computed(() => article),

        toc: computed(() => generateToc(article.content)),
    }
}