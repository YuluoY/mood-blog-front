import { defineComponent, h, PropType } from 'vue'

export default defineComponent({
  name: 'SvgIcon',

  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    iconClass: {
      type: String as PropType<string>,
      default: 'inner',
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 1,
    },
    unit: {
      type: String as PropType<'em' | 'px' | 'rem' | '%'>,
      default: 'em',
    },
    color: {
      type: String as PropType<string>,
      default: '',
    },
  },

  setup(props) {
    /**
     * @description: 根据位置添加符号
     * @param {string} val  // 值
     * @param {string} sign  // 符号
     * @param {'prefix' | 'suffix'} pos 符号位置
     * @return {string} // 返回拼接后的字符串
     */
    const addSignByPos = (val: string | number, sign: string, pos: 'prefix' | 'suffix' = 'prefix'): string =>
      val ? `${pos === 'prefix' ? sign : ''}${val}${pos === 'suffix' ? sign : ''}` : String(val)

    return () =>
      h(
        'div',
        {
          class: 'svg-icon-container',
          style: {
            width: addSignByPos(props.size, props.unit, 'suffix'),
            height: addSignByPos(props.size, props.unit, 'suffix'),
            color: props.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease-in-out',
            marginTop: '-2px'
          },
        },
        h(
          'svg',
          {
            class: `svg-icon svg-icon-container${addSignByPos(props.iconClass, '__')}`,
            style: {
              width: '100%',
              height: '100%',
            },
          },
          h('use', {
            'xlink:href': `#icon${addSignByPos(props.name, '-')}`,
          })
        )
      )
  },
})
