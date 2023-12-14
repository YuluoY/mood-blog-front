import { IYFormItemConfig } from '@/components/global/YForm/types/index.ts';
import { useWriteStore } from '@/store/writeStore.ts'
import { ExposeParam } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage, UploadFile, UploadUserFile } from 'element-plus';
import { IResponseTemplate } from '@/types/core/index.ts'

export const useEditor = ({
  editorRef,
  uploadRef,
  useUserStore
}: {
  editorRef: Ref<ExposeParam | null>,
  uploadRef: Ref<{ submit: Function; abort: Function, handleRemove: Function } | null>,
  useUserStore: () => any
}) => {

  const writeStore = useWriteStore();
  const isVisiableDialog = ref(false); // 是否显示上传图片的弹窗

  const publishFormConfigure: IYFormItemConfig[] = [
    {
      prop: 'title',
      label: '标题',
      rules: [
        { required: true, message: '请输入标题', trigger: 'blur' },
      ],
    },
  ]

  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const disabled = ref(false)


  const handleRemove = (file: UploadFile) => {
    uploadRef.value.handleRemove(file);
  }

  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true;
  }

  const handleExceed = (files: File[], uploadFiles: UploadUserFile[]): void => {
    ElMessage.info(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + uploadFiles.length} 个文件`)
  }

  const handleSuccess = async (response: IResponseTemplate<string>) => {
    writeStore.setFormCover(response.data);
    const res = await writeStore.onSave();
    if (res) {
      isVisiableDialog.value = false;
      writeStore.setFormContent('');
    }
  }

  const onSubmitForm = async () => {
    uploadRef.value?.submit()
  }

  const onSave = (v: string, h: Promise<string>): void => {
    isVisiableDialog.value = true;
    writeStore.form.userId = useUserStore().id;
    writeStore.setFormTitle(v);
    h.then((html) => {
      writeStore.setFormContent(html);
    })
  }

  onMounted(() => {
  })


  return {
    writeStore: computed(() => writeStore),
    form: computed(() => writeStore.form),
    editorOptions: computed(() => writeStore.editorOptions),
    onSave,
    isVisiableDialog,
    publishFormConfigure,
    onSubmitForm,

    // upload
    dialogImageUrl,
    dialogVisible,
    disabled,
    handleRemove,
    handlePictureCardPreview,
    handleExceed,
    handleSuccess
  }
}