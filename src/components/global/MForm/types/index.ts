import { InputEmits } from 'element-plus'

export interface IMFormItemConfig {
    rules?: import('element-plus').FormItemRule[],
    prop: string
    labelWidth?: string
    label?: string
    showPassword?: boolean
    prefixIcon?: string | import('vue').Component
    suffixIcon?: string | import('vue').Component
    size?: 'large' | 'small' | 'default'
    disabled?: boolean
    type?: string
    autocomplete?: string
    autofocus?: boolean
    autoSize?:boolean | { minRows?: number, maxRows?: number }
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
    placeholder?: string
    clearable?: boolean
    rows?: number
    showWordLimit?: boolean
    maxLength?: string | number
    minLength?: number
    readonly?: boolean
    tabindex?: string | number
    validateEvent?: boolean
    inputStyle?: import('vue').StyleValue
    formatter?: (value: string) => string
    parser?: (value: string) => string
    onBlur?: InputEmits['blur']
    onChange?:InputEmits['change']
    onInput?: InputEmits['input']
    onFocus?: InputEmits['focus']
    onClear?: InputEmits['clear']
}

export interface IMFormProps<T extends Object> {
    formConfigures: IMFormItemConfig[],
    formData: T
    labelPosition?: 'left' | 'top' | 'right',
    inlineMessage?: boolean
}