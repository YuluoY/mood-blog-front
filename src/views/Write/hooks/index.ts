/*
 * @Author: huyongle 568055454@qq.com
 * @Date: 2023-11-30 00:37:00
 * @LastEditors: huyongle 568055454@qq.com
 * @LastEditTime: 2024-02-20 19:37:06
 * @FilePath: \mood-blog-front\src\views\Write\hooks\index.ts
 * @Description: 攥写文章的页面。逻辑：攥写文章内容 --> 保存出现弹窗 --> 填写文章的相关表单 --> 校验表单
 * 
 * Copyright (c) 2024 by 雨落, All Rights Reserved. 
 */
import { MFormItemConfig } from '@/components/global/MForm/types/index.ts';
import { useWriteStore } from '@/store/writeStore.ts'
import { ExposeParam, ToolbarNames } from 'md-editor-v3'
import { ElMessage, ElUpload, UploadFile, UploadFiles, UploadUserFile } from 'element-plus';
import { IResponseTemplate } from '@/types/core/index.ts'
import { preText, toTrim, deepClone } from '@/utils/core.ts';
import { useTagStore } from '@/store/tagStore.ts';
import { useCategoryStore } from '@/store/categoryStore.ts';
import { IArticle, ICreateArticle } from '@/types/api/article.ts';
import MForm from '@/components/global/MForm/index.ts';
import { ITag } from '@/types/api/tag.ts';
import { ICategory } from '@/types/api/category.ts';
import { useGlobalStore } from '@/store/globalStore.ts';
import { addLocalFile } from '@/api/file.ts';

export const useWritePage = async ({
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

  const parser = new DOMParser(); // 用于解析dom
  const uploadFileChange = ref(false);

  if (!tagStore.tags?.length) {
    await tagStore.fetchTags();
  }

  if (!categoryStore.categories?.length) {
    await categoryStore.fetchCategories();
  }

  let tagOptions: { label: string, value: any, color: string }[] = tagStore.tags.map((tag: ITag) => {
    return {
      label: tag.tagName,
      value: tag.tagName,
      color: tag.tagColor
    }
  })
  let categoryOptions: { label: string, value: any }[] = categoryStore.categories.map((c: ICategory) => {
    return {
      label: c.cateName,
      value: c.id,
      color: c.cateColor
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
      placeholder: '请输入标题或自动填充内容中第一个“# ”后的文本',
      rules: [
        { required: true, message: '请输入标题', trigger: 'blur' },
      ],
    },
    {
      prop: 'description',
      type: 'textarea',
      label: '描述',
      labelWidth: '70',
      placeholder: '请输入描述或自动填充内容中第一个“> ”后的文本',
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
      placeholder: '请选择类别',
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
      defaultFirstOption: true,
      reserveKeyword: false,
      clearable: true,
      labelWidth: '70',
      placeholder: '请选择或自定义标签',
      tip: '若存在自定义标签，需要在发布文章后，刷新页面选项中才会出现哦！',
      options: tagOptions,
      style: { width: '100%' },
      rules: [
        { required: true, message: '至少选择一个标签', trigger: 'blur' }
      ]
    },
  ]

  const toolbars: ToolbarNames[] = [
    'bold', 'underline', 'italic',
    '-',
    'title', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task',
    '-',
    'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex',
    '-',
    'revoke', 'next', 0,
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
  const onSaveArticle = async <T = any>(article: T & object): Promise<void> => {
    const res = await writeStore.onSave<T>(article);
    if (res) {
      mFormRef.value.cleanFormData<ICreateArticle>(writeStore.form)
      uploadFileChange.value = false;
    }
  }

  /**
   * @description: 处理文章内容中的图片上传
   * @param {ICreateArticle} form 表单
   * @return {Promise<void>}
   */
  const processUploadImages = async (form: Partial<ICreateArticle>): Promise<void> => {
    // 过滤掉被删除的图片
    const filterNewUploadImages = writeStore.loaclUploadImages.filter(item => form.content.indexOf(item.localUrl) > -1)

    // 上传 返回url
    const urls = await Promise.all(filterNewUploadImages.map(item => {
      return new Promise((resolve, _reject) => {
        addLocalFile(item.rawFile).then(res => resolve(res.data))
      })
    })) as string[]

    for (let i = 0; i < urls.length; i++) {
      form.content = form.content.replace(filterNewUploadImages[i].localUrl, urls[i]);
    }

    writeStore.loaclUploadImages.length = 0;
  };

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
  const handleExceed = (files: File[], _uploadFiles: UploadUserFile[]): void => {
    ElMessage.info(t(`writeView.fileLimitError`, [files.length.toString()]));
  }

  /**
   * @description: 对文章的表单验证
   * @return {Promise<void>}
   */
  const handleValidate = async (): Promise<void> => {
    if (!writeStore.form.content.length) {
      ElMessage({ type: 'info', message: '文章内容不允许为空哦！' })
      return;
    }
    if (await mFormRef.value.validator()) {
      const formData = deepClone(writeStore.form);
      formData.tags = formData.tags.map((tag: any) => {
        const newTag = { tagName: tag };
        if (!tagStore.tags.find((item: ITag) => item.tagName === tag)) {
          tagStore.tags.push(newTag)
        }
        return newTag
      })
      formData.category = { id: formData.category } as any
      formData.cover = formData.cover ? formData.cover : useGlobalStore().getDefaultCover;

      await processUploadImages(formData)
      await onSaveArticle(formData);
    }
  }

  /**
   * @description: 文件上传失败的钩子
   * @param {Error} err 错误信息
   * @param {UploadFile} file 文件
   * @param {UploadFile} fileList 文件列表
   * @return {void}
   */
  const handleError = async (_err: Error, _file: UploadFile, _fileList: UploadFile[]): Promise<void> => {
    ElMessage.error(t('writeView.fileUploadError'));
    handleValidate();
  }

  /**
   * @description: 文件上传成功的钩子，文件上传成功后，将进行文章的保存
   * @param {IResponseTemplate} response 响应
   * @return {void}
   */
  const handleSuccess = async (response: IResponseTemplate<string>): Promise<void> => {
    writeStore.form.cover = response.data;
    handleValidate();
  }

  const handleChange = (_uploadFile: UploadFile, _uploadFiles: UploadFiles) => {
    uploadFileChange.value = true;
  }


  // 自动填充表单
  const autoCompleteForm = () => {
    writeStore.form.userId = useUserStore().id;
    const doc = parser.parseFromString(writeStore.form.content, 'text/html');
    // 处理标题id可能重复的问题
    const titles = doc.querySelectorAll('h1,h2,h3');
    titles.forEach(dom => {
      const id = dom.getAttribute('id');
      const line = dom.getAttribute('data-line');
      doc.getElementById(id)?.setAttribute('id', `${id}-${line}`)
    })

    writeStore.form.words = preText(doc.body.innerText)?.length;
    writeStore.form.title = writeStore.form.title ? writeStore.form.title : toTrim(doc.querySelector('h1')?.innerText);
    writeStore.form.description = writeStore.form.description ? writeStore.form.description : toTrim(doc.querySelector('blockquote')?.innerText);
    writeStore.form.content = doc.body.innerHTML;
  }

  /**
   * @description: 提交表单，填写弹出框的更多信息后点击提交按钮
   * @return {void}
   */
  const onSubmitForm = async (): Promise<void> => {
    autoCompleteForm();
    if (uploadFileChange.value) uploadRef.value?.submit()
    else handleValidate();
  }

  /**
   * @description: 同步内容
   * @param {string} h  html内容
   * @return {void}
   */
  const onHtmlChanged = (h: string): void => {
    writeStore.form.content = h
  }

  /**
   * @description: 文章内容中上传图片
   * @param {Array} files  图片信息数组
   * @param {function} callback 
   * @return {Promise<void>}
   */
  const handleUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> => {
    const MAX_SIZE = 2;  // 最大图片上传2MB
    callback(files.map(file => {
      if (file.size / 1024 / 1024 < MAX_SIZE) {
        const localUrl = URL.createObjectURL(file);
        writeStore.loaclUploadImages.push({
          rawFile: file,
          localUrl
        })
        return localUrl;
      } else {
        ElMessage.info(`图片“${file.name}”超过最大上传大小2MB！`)
        return '';
      }
    }))
  }

  return {
    writeStore,
    editorOptions: computed(() => writeStore.editorOptions),
    onHtmlChanged,
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
    handleChange,
    handleUploadImg
  }
}