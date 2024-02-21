module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "vue/setup-compiler-macros": true,
    },
    "extends": [
        "plugin:vue/vue3-strongly-recommended",
        "airbnb-base",
        "prettier",
        "./.eslintrc-auto-import.json"
    ],
    // ESlint会对代码校验，parser的作用是将代码转换成ESTree（AST语法树）进行代码校验
    "parser": "vue-eslint-parser",
    "parserOptions": {
        // es版本号或年份
        "ecmaVersion": 13,
        "parser": "@typescript-eslint/parser",
        // 源码类型 默认是script, es模块使用module
        "sourceType": "module",
        // 额外的语言类型
        "ecmaFeatures": {
            "tsc": true,
            "jsx": true
        }
    },
    // 全局自定义的宏，这样在源文件中使用全局变量不会报错或警告
    "globals": {
        "defireProps": "readonly",
        "defineEmits": "readonly",
        "defineExpose": "readonly",
        "withDefaults": "readonly",
    },
    // 前缀eslint-plugin- 可以省略
    // vue官方提供了一个ESlint插件————eslint-plugin-vue，它提供了parser和rules。
    // parse：vue-eslint-parser放在上面的parsers里，rules放在extends字段里，选择合适的规则
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "settings": {
        // 项目内别名
        "import/resolver": {
            "alias": {
                map: [
                    ["@", "./src"]
                ]
            }
        },
        // 允许的拓展名
        "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".mjs"]
    },
    // 自定义规则， 覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
    "rules": {
        "import/no-extraneous-dependencies": 0, // 允许引入devDependencies
        "no-param-reassign": 0, // 允许对函数参数进行重新赋值
        "vue/multi-word-component-names": 0, // 组件名驼峰
        "vue/attribute-hyphenation": 0, // 属性名驼峰 
        "vue/v-on-event-hyphenation": 0, // 事件名驼峰
        'no-unused-vars': 'off', // 允许定义未使用的变量
        'no-console': 0,
        // 'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 允许空样式表
        'vue/valid-v-slot': ['error', {
            allowModifiers: true,
        }],
        'no-restricted-globals': 'off',
        'no-else-return': 'off',
        'lines-between-class-members': 'off',
        'no-unused-expressions': "off",
        'no-empty': 'off', // 不能为空
        'no-plusplus': 'off', // 不能使用 ++
        'prefer-const': 'off', // 没有多次赋值的用const
        'no-useless-return': 'off', // 允许在return语句中使用unless
        'vue/no-empty-script': 'off',   // 允许空的script标签
        'arrow-body-style': 'off', // 箭头函数体风格，off 表示禁用此规则，允许使用非必要的括号
        "import/prefer-default-export": 'off', // 当模块只有一个导出时，是否使用默认导出。off 表示禁用此规则，允许使用非默认导出
        'vue/no-v-for-template-key': 'off', // vue3  v-for 中template 可以设置key
        '@typescript-eslint/no-explicit-any': 'off', // 表示禁用此规则，允许使用 any 类型
        '@typescript-eslint/no-var-requires': 'off', // 禁止使用 require() 导入。off 表示禁用此规则，允许使用 require()。
        "eqeqeq": ['error', 'always'], // 要求使用恒等（===）而不是等于（==）进行比较，否则报错。
        'vue/no-multiple-template-root': 'off', // vue3 模板可以有多个根结点
        'vue/custom-event-name-casing': 'off', // 自定义 Vue.js 事件名称的大小写规则。off 表示禁用此规则。
        'no-use-before-define': 'error', // 禁止在定义之前使用变量。error 表示将此视为错误
        'guard-for-in': 'error', // 要求在 for-in 循环中使用 hasOwnProperty 方法进行条件过滤，否则报错。
        'consistent-this': ['error', '_this', 'that', 'self'], // 要求在代码中使用指定的别名代替 this（_this、that、self），否则报错。
    }
}