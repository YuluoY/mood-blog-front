/*
 * @Author: huyongle 568055454@qq.com
 * @Date: 2023-11-30 00:37:00
 * @LastEditors: huyongle 568055454@qq.com
 * @LastEditTime: 2024-01-30 08:58:37
 * @FilePath: \mood-blog-front\src\views\Write\hooks\index.ts
 * @Description: 攥写文章的页面。逻辑：攥写文章内容 --> 保存出现弹窗 --> 填写文章的相关表单 --> 校验表单
 * 
 * Copyright (c) 2024 by 雨落, All Rights Reserved. 
 */
import { MFormItemConfig } from '@/components/global/MForm/types/index.ts';
import { useWriteStore } from '@/store/writeStore.ts'
import { ExposeParam, ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage, ElUpload, UploadFile, UploadFiles, UploadUserFile } from 'element-plus';
import { IResponseTemplate } from '@/types/core/index.ts'
import { preText, toTrim } from '@/utils/core.ts';
import { useTagStore } from '@/store/tagStore.ts';
import { useCategoryStore } from '@/store/categoryStore.ts';
import { IArticle } from '@/types/api/article.ts';
import MForm from '@/components/global/MForm/index.ts';
import { ITag } from '@/types/api/tag.ts';
import { ICategory } from '@/types/api/category.ts';
import { useGlobalStore } from '@/store/globalStore.ts';

export const useWritePage = async ({
  editorRef,
  uploadRef,
  useUserStore,
  mFormRef
}: {
  editorRef: Ref<ExposeParam | null>,
  uploadRef: Ref<InstanceType<typeof ElUpload>>,
  useUserStore: () => any
  mFormRef: Ref<InstanceType<typeof MForm>>
}) => {

  const { t } = useI18n();
  const writeStore = useWriteStore();
  const tagStore = useTagStore();
  const categoryStore = useCategoryStore()

  const isVisiableDialog = ref(false); // 是否显示上传图片的弹窗
  const parser = new DOMParser(); // 用于解析dom
  const uploadFileChange = ref(false);


  if (!tagStore.tags?.length) {
    await tagStore.fetchTags();
  }

  if (!categoryStore.categories?.length) {
    await categoryStore.fetchCategories();
  }

  const tagOptions: { label: string, value: any, color: string }[] = tagStore.tags.map((tag: ITag) => {
    return {
      label: tag.tagName,
      value: tag.id,
      color: tag.tagColor
    }
  })
  const categoryOptions: { label: string, value: any }[] = categoryStore.categories.map((c: ICategory) => {
    return {
      label: c.cateName,
      value: c.id
    }
  })


  /**
   * 这是表单的配置，默认是text的el-input
   */
  const publishFormConfigure: (MFormItemConfig<IArticle> & Partial<import('element-plus').ISelectProps>)[] = [
    {
      prop: 'title',
      label: '标题',
      labelWidth: '70',
      rules: [
        { required: true, message: '请输入标题', trigger: 'blur' },
      ],
    },
    {
      prop: 'description',
      type: 'textarea',
      label: '描述',
      labelWidth: '70',
      autoSize: true,
      rules: [
        { required: true, message: '请输入描述', trigger: 'blur' },
      ]
    },
    {
      prop: 'category',
      type: 'select',
      label: '类别',
      labelWidth: '70',
      options: categoryOptions,
      rules: [
        { required: true, message: '请选择类别', trigger: 'blur' }
      ]
    },
    {
      prop: 'tags',
      type: 'select',
      label: '标签',
      multiple: true,
      filterable: true,
      allowCreate: true,
      labelWidth: '70',
      options: tagOptions,
      style: {
        width: '100%'
      }
    }
  ]

  const toolbars: ToolbarNames[] = [
    'bold', 'underline', 'italic',
    '-',
    'title', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task',
    '-',
    'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex',
    '-',
    'revoke', 'next', 0, 'save',
    '=',
    'prettier', 'pageFullscreen', 'fullscreen', 'preview', 'htmlPreview', 'catalog', 'github'
  ];

  /**
   * 弹出框的缩略图图片url
   */
  const dialogImageUrl = ref('')
  /**
   * 弹出框的显示
   */
  const dialogVisible = ref(false)
  /**
   * 是否禁用上传
   */
  const disabled = ref(false)

  /**
   * @description: 保存文章的操作函数
   * @return {void}
   */
  const onSaveArticle = async (): Promise<void> => {
    console.log(writeStore.form, '12312321');

    const res = await writeStore.onSave();
    if (res) {
      isVisiableDialog.value = false;
      // writeStore.setFormContent('');
      writeStore.initForm();
      uploadFileChange.value = false;
    }
  }

  /**
   * @description: 删除文件缩略图
   * @param {UploadFile} file 文件
   * @return {void}
   */
  const handleRemove = (file: UploadFile): void => {
    uploadRef.value.handleRemove(file);
    uploadFileChange.value = false;
  }

  /**
   * @description: 文件缩略图预览
   * @param {UploadFile} file 文件
   * @return {void}
   */
  const handlePictureCardPreview = (file: UploadFile): void => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true;
  }

  /**
   * @description: 文件上传限制的钩子
   * @param {File} files 文件列表
   * @param {UploadUserFile} uploadFiles 上传的文件列表
   * @return {void}
   */
  const handleExceed = (files: File[], uploadFiles: UploadUserFile[]): void => {
    ElMessage.info(t(`writeView.fileLimitError`, [files.length.toString()]));
  }

  // 表单校验
  const handleValidate = async () => {
    if (await mFormRef.value.validator()) {
      writeStore.form.tags = writeStore.form.tags.map((item: any) => tagStore.tags?.find((tag: ITag) => tag.id === item) || item)
      writeStore.form.category = categoryStore.categories.find((category: ICategory) => category.id === writeStore.form.category);
      writeStore.form.cover = writeStore.form.cover || useGlobalStore().getDefaultCover;
      await onSaveArticle();
    }
  }

  /**
   * @description: 文件上传失败的钩子
   * @param {Error} err 错误信息
   * @param {UploadFile} file 文件
   * @param {UploadFile} fileList 文件列表
   * @return {void}
   */
  const handleError = async (err: Error, file: UploadFile, fileList: UploadFile[]): Promise<void> => {
    ElMessage.error(t('writeView.fileUploadError'));
    handleValidate();
  }

  /**
   * @description: 文件上传成功的钩子，文件上传成功后，将进行文章的保存
   * @param {IResponseTemplate} response 响应
   * @return {void}
   */
  const handleSuccess = async (response: IResponseTemplate<string>): Promise<void> => {
    writeStore.setFormCover(response.data);
    handleValidate();
  }

  const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    uploadFileChange.value = true;
  }

  /**
   * @description: 提交表单，填写弹出框的更多信息后点击提交按钮
   * @return {void}
   */
  const onSubmitForm = async (): Promise<void> => {
    if (uploadFileChange.value) uploadRef.value?.submit()
    else handleValidate();
  }

  /**
   * @description: 内容保存，将显示弹出框，填写更多信息
   * @param {string} v  文章内容
   * @param {Promise} h  Promise对象，返回文章的html
   * @return {void}
   */
  const onSave = (v: string, h: Promise<string>): void => {
    isVisiableDialog.value = true;
    writeStore.form.userId = useUserStore().id;
    h.then((html) => {
      const doc = parser.parseFromString(html, 'text/html');

      // 处理标题id可能重复的问题
      const titles = doc.querySelectorAll('h1,h2,h3');
      titles.forEach(dom => {
        const id = dom.getAttribute('id');
        const line = dom.getAttribute('data-line');
        doc.getElementById(id)?.setAttribute('id', `${id}-${line}`)
      })

      setTimeout(() => {
        writeStore.form.words = preText(doc.body.innerText)?.length;
        writeStore.form.title = writeStore.form.title ? writeStore.form.title : toTrim(doc.querySelector('h1')?.innerText);
        writeStore.form.description = writeStore.form.description ? writeStore.form.description : toTrim(doc.querySelector('blockquote')?.innerText);
        writeStore.setFormContent(doc.body.innerHTML);
      }, 100);
    })
  }



  return {
    writeStore: computed(() => writeStore),
    form: writeStore.form,
    editorOptions: computed(() => writeStore.editorOptions),
    onSave,
    isVisiableDialog,
    publishFormConfigure,
    onSubmitForm,

    toolbars,

    // upload
    dialogImageUrl,
    dialogVisible,
    disabled,
    handleRemove,
    handlePictureCardPreview,
    handleExceed,
    handleSuccess,
    handleError,
    handleChange
  }
}