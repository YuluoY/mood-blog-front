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
        "prettier"
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
        "import/no-extraneous-dependencies": 0,
        "no-param-reassign": 0,
        "vue/multi-word-component-names": 0,
        "vue/attribute-hyphenation": 0,
        "vue/v-on-event-hyphenation": 0
    }
}