import { FormRules } from "element-plus";

export const useLogin = () => {
  const loginVisiable = ref(false);
  const { t } = useI18n();

  interface IFromRule {
    email: string
    password: string
    captcha: string
  }
  const loginForm = reactive<IFromRule>({
    email: '',
    password: '',
    captcha: '', // 验证码
  })

  const rules = reactive<FormRules<IFromRule>>({
    email: [
      { required: true, message: t('head.login.emailPlaceholder'), trigger: 'blur' },
      { type: 'email', message: t('head.login.emailRightPlaceholder'), trigger: ['blur', 'change'] }
    ],
    password: [
      { required: true, message: t('head.login.passwordPlaceholder'), trigger: 'blur' },
      { min: 6, max: 20, message: t('head.login.passwordRightPlaceholder'), trigger: 'blur' }
    ],
    captcha: [
      { required: true, message: t('head.login.captchaPlaceholder'), trigger: 'blur' },
      { min: 4, max: 4, message: t('head.login.captchaPlaceholder'), trigger: 'blur' }
    ]
  });


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
    rules
  }
}