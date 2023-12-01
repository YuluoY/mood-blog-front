import { IYFormItemConfig } from "@/components/global/YForm/types/index.ts";

export const useLogin = () => {
  const loginVisiable = ref(false);
  const { t } = useI18n();

  interface IFormRule {
    [key: string]: string;
    email: string
    password: string
    captcha: string
  }

  const loginForm = reactive<IFormRule>({
    email: '',
    password: '',
    captcha: '', // 验证码
  })

  const formConfigures: Array<IYFormItemConfig> = [
    {
      prop: 'email',
      label: t('head.login.email'),
      labelWidth: '80',
      placeholder: t('head.login.emailPlaceholder'),
      rules: [
        { required: true, type: 'email', message: t('head.login.emailRightPlaceholder'), trigger: ['blur'] }
      ]
    },
    {
      prop: 'password',
      label: t('head.login.password'),
      labelWidth: '80',
      showPassword: true,
      placeholder: t('head.login.passwordPlaceholder'),
      rules: [
        { required: true, min: 6, max: 20, message: t('head.login.passwordRightPlaceholder'), trigger: 'blur' }
      ]
    },
    {
      prop: 'captcha',
      label: t('head.login.captcha'),
      labelWidth: '80',
      placeholder: t('head.login.captchaPlaceholder'),
      rules: [
        { required: true, min: 4, max: 4, message: t('head.login.captchaRightPlaceholder'), trigger: 'blur' }
      ]
    },
  ]


  const showLogin = () => {
    loginVisiable.value = true;
  }

  const hideLogin = () => {
    loginVisiable.value = false;
  }

  const submitFrom = () => {
    console.log(loginForm);
  }


  return {
    loginVisiable,
    showLogin,
    hideLogin,

    loginForm,
    submitFrom,
    formConfigures
  }
}