import { ElMessage } from "element-plus";
import { login } from "@/api/user.ts";
import { isEmail, debounce } from "@/utils/core.ts";
import { IUser } from "@/types/api/user.ts";

export const useLogin = () => {
  const loginVisiable = ref(false);
  const { t } = useI18n();

  interface IFormRule {
    [key: string]: string;
    unique: string
    password: string
    code: string
  }

  const loginForm = reactive<IFormRule>({
    unique: '',
    password: '',
    code: '', // 验证码
  })

  const showLogin = () => {
    loginVisiable.value = true;
  }

  const hideLogin = () => {
    loginVisiable.value = false;
  }

  const submitFrom = async () => {
    if (!loginForm.unique || !loginForm.password || !loginForm.code) {
      ElMessage.info(t('head.login.completeTips'));
      return;
    }
    const newLoginForm = { ...loginForm };
    newLoginForm[isEmail(newLoginForm.unique) ? 'email' : 'username'] = newLoginForm.unique;
    delete newLoginForm.unique;
    const res = await login<any, IUser>(newLoginForm);
    if(res.success){
      ElMessage.success(t('head.login.success'));
      hideLogin();
    }
  }


  return {
    loginVisiable,
    showLogin,
    hideLogin,

    loginForm,
    submitFrom: debounce(submitFrom),
    // formConfigures
  }
}