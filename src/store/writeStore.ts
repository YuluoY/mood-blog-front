import { defineStore } from 'pinia'
import { IEditorOptions } from '@/types/store/writeStore.ts'
import { ICreateArticle } from '@/types/api/article.ts'
import { addArticle } from '@/api/article.ts'
import { ElMessage } from 'element-plus'
import { StoreNames } from './namespace.ts'

export const useWriteStore = defineStore(StoreNames.Write, {
  state: () => {
    const editorOptions: IEditorOptions = {
      theme: 'light',
      language: 'zh-CN',
      showCodeRowNumber: true,
      previewTheme: 'vuepress',
      codeTheme: 'github',
    }
    const form: ICreateArticle = {
      title: '',
      content: '',
      cover: 'cover.png',
      status: 0,
      description: '',
      userId: '',
      category: [],
    }

    return {
      content: '',
      form,
      editorOptions,  // https://imzbf.github.io/md-editor-v3/zh-CN/docs
    }
  },
  actions: {
    setEditorOptions(options: Partial<IEditorOptions>) {
      this.editorOptions = Object.assign(this.editorOptions, options);
    },
    setFormCover(url: string) {
      this.form.cover = url;
    },
    setFormContent(content: string) {
      this.form.content = content;
    },
    setFormTitle(v: string) {
      const title = /# (.+?)\n/.exec(v)?.[1];
      this.form.title = title;
    },
    async onSave() {
      const res = await addArticle(this.form);
      if(res.success){
        ElMessage.success(res.data);
        this.initForm();
        this.content = '';
        return true;
      }else{
        ElMessage.error(res.data);
        return false;
      }
    },
    initForm() {
      this.form = {
        title: '',
        content: '',
        cover: 'cover.png',
        status: 0,
        description: '',
        userId: '',
        category: [],
      }
    }
  },
  getters: {

  },

  persist: {
    key: `mood-${StoreNames.Write}`,
    storage: sessionStorage,
  },
})
