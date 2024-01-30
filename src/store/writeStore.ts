import { defineStore } from 'pinia'
import { IEditorOptions } from '@/types/store/writeStore.ts'
import { ICreateArticle } from '@/types/api/article.ts'
import { addArticle } from '@/api/article.ts'
import { ElMessage } from 'element-plus'
import { EnumStatus } from '@/types/core/index.ts'
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
      cover: '',
      status: EnumStatus.UnAudit,
      description: '',
      userId: '',
      likes: [],
      views: [],
      category: null,
      tags: [],
      words: 0
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
    async onSave<T>(data: T & object) {
      const res = await addArticle<T>(data);
      console.log(res, 'res');

      if (res.success) {
        ElMessage.success(res.data);
        this.initForm();
        return true;
      } else {
        ElMessage.error(res.data);
        return false;
      }
    },
    initForm() {

      console.log(this.rawForm, 'raw');

      this.form = this.getRawForm() as any
      this.content = '';
      console.log(this.form);

    },
    getRawForm() {
      return {
        title: '',
        content: '',
        cover: '',
        status: EnumStatus.UnAudit,
        description: '',
        userId: '',
        likes: [],
        views: [],
        category: null,
        tags: [],
        words: 0
      } as ICreateArticle
    }
  },
  getters: {
  
  },

  persist: {
    key: `mood-${StoreNames.Write}`,
    storage: sessionStorage,
  },
})
