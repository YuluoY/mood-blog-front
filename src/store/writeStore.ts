import { defineStore } from 'pinia'
import { IEditorOptions, IWriteForm } from '@/types/store/writeStore.ts'
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
    const form: IWriteForm = {
      title: '',
      content: '',
      cover: 'cover.png',
      status: 0,
    }

    return {
      form,
      editorOptions,  // https://imzbf.github.io/md-editor-v3/zh-CN/docs
    }
  },
  actions: {
    setEditorOptions(options: Partial<IEditorOptions>) {
      this.editorOptions = Object.assign(this.editorOptions, options);
    },

    onSave(v: string, h: string) {
      const title = /# (.+?)\n/.exec(v)?.[1];
      this.form.title = title;
      // console.log(v, h, this.form);
    }
  },
  getters: {

  },

  persist: {
    key: `mood-${StoreNames.Write}`,
    storage: sessionStorage,
  },
})
