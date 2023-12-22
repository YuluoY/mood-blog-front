import { ElMessage } from "element-plus";
import { isEmail, debounce } from "@/utils/core.ts";
import { useUserStore } from "@/store/userStore.ts";
import { mainStore } from "@/store/mainStore.ts";
import { IUser, IUserForm } from "@/types/api/user.ts";
import { login } from "@/api/user.ts";

export const useLogin = () => {
  const loginVisiable = ref(false);
  const { t } = useI18n();
  const userStore = useUserStore();

  const loginForm = reactive<IUserForm>({
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

  const initLoginForm = () => {
    loginForm.code = '';
    loginForm.password = '';
    loginForm.unique = '';
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
      useUserStore().setUser(res.data);
      initLoginForm();
      mainStore().logined();
    }
  }

  return {
    loginVisiable,
    showLogin,
    hideLogin,

    loginForm,
    submitFrom: debounce(submitFrom),
  }
}