import { IMFormItemConfig } from '@/components/global/MForm/types/index.ts';
import { useWriteStore } from '@/store/writeStore.ts'
import { ExposeParam, ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage, UploadFile, UploadUserFile } from 'element-plus';
import { IResponseTemplate } from '@/types/core/index.ts'
import { toTrim } from '@/utils/core.ts';

export const useEditor = ({
  editorRef,
  uploadRef,
  useUserStore
}: {
  editorRef: Ref<ExposeParam | null>,
  uploadRef: Ref<{ submit: Function; abort: Function, handleRemove: Function } | null>,
  useUserStore: () => any
}) => {

  const { t } = useI18n();
  const writeStore = useWriteStore();
  const isVisiableDialog = ref(false); // 是否显示上传图片的弹窗
  const parser = new DOMParser(); // 用于解析dom

  /**
   * 这是表单的配置，默认是text的el-input
   */
  const publishFormConfigure: IMFormItemConfig[] = [
    {
      prop: 'title',
      label: '标题',
      labelWidth:'70',
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
    const res = await writeStore.onSave();
    if (res) {
      isVisiableDialog.value = false;
      writeStore.setFormContent('');
    }
  }

  /**
   * @description: 删除文件缩略图
   * @param {UploadFile} file 文件
   * @return {void}
   */
  const handleRemove = (file: UploadFile): void => {
    uploadRef.value.handleRemove(file);
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

  /**
   * @description: 文件上传失败的钩子
   * @param {Error} err 错误信息
   * @param {UploadFile} file 文件
   * @param {UploadFile} fileList 文件列表
   * @return {void}
   */
  const handleError = async (err: Error, file: UploadFile, fileList: UploadFile[]): Promise<void> => {
    ElMessage.error(t('writeView.fileUploadError'));
    await onSaveArticle();
  }

  /**
   * @description: 文件上传成功的钩子，文件上传成功后，将进行文章的保存
   * @param {IResponseTemplate} response 响应
   * @return {void}
   */
  const handleSuccess = async (response: IResponseTemplate<string>): Promise<void> => {
    writeStore.setFormCover(response.data);
    await onSaveArticle();
  }

  /**
   * @description: 提交表单，填写弹出框的更多信息后点击提交按钮
   * @return {void}
   */
  const onSubmitForm = async (): Promise<void> => {
    uploadRef.value?.submit()
  }

  /**
   * @description: 内容保存，将显示弹出框，填写更多信息
   * @param {string} v  文章内容
   * @param {Promise} h  Promise对象，返回文章的html
   * @return {void}
   */
  const onSave = (v: string, h: Promise<string>): void => {
    isVisiableDialog.value = true;
    writeStore.form.description = v;
    writeStore.form.userId = useUserStore().id;
    h.then((html) => {
      const doc = parser.parseFromString(html, 'text/html');
      writeStore.form.title = toTrim(doc.querySelector('h1')?.innerText);
      writeStore.form.description = toTrim(doc.querySelector('blockquote')?.innerText);
      writeStore.setFormContent(html);
    })
  }

  return {
    writeStore: computed(() => writeStore),
    form: computed(() => writeStore.form),
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
    handleError
  }
}