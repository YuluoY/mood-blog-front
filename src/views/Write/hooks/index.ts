import { IYFormItemConfig } from '@/components/global/YForm/types/index.ts';
import { useWriteStore } from '@/store/writeStore.ts'
import { ExposeParam } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage, UploadFile, UploadUserFile } from 'element-plus';
import request from '@/utils/request.ts';

export const useEditor = ({
  editorRef,
}: {
  editorRef: Ref<ExposeParam | null>,
}) => {

  const writeStore = useWriteStore();
  const isVisiableDialog = ref(false);

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

  const handleChange = (file: UploadFile, fileList: UploadFile[]) => {
  }

  const handleRemove = (file: UploadFile) => {
    console.log(file)
  }

  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true;
  }

  const handleDownload = (file: UploadFile) => {
    console.log(file)
  }

  const handleExceed = (files: File[], uploadFiles: UploadUserFile[]): void => {
    ElMessage.info(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + uploadFiles.length} 个文件`)
  }


  const onSave = (v: string, h: Promise<string>): void => {
    isVisiableDialog.value = true;
    h.then((html) => {
      writeStore.onSave(v, html);
    })
  }

  onMounted(() => {
  })


  return {
    form: computed(() => writeStore.form),
    editorOptions: computed(() => writeStore.editorOptions),
    onSave,
    isVisiableDialog,
    publishFormConfigure,

    // upload
    dialogImageUrl,
    dialogVisible,
    disabled,
    handleRemove,
    handlePictureCardPreview,
    handleDownload,
    handleExceed,
    handleChange
  }
}