/*
 * @Author: wenlin
 * @Date: 2020-05-06 16:28:59
 * @LastEditors: wenlin
 * @LastEditTime: 2020-11-12 13:18:46
 * @Description:
 *
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */

// 1. 关闭段落校验
// /* eslint-disable */
// /* eslint-enable */
// 2. 关闭当前行校验
// // eslint-disable-line
// 3. 关闭下一行校验
// // eslint-disable-next-line

module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    // Amap: 'writable'
    // "Amap": "readonly"
  },
  extends: [
    "./node_modules/ml-eslint/index.js"
    // 'ml-eslint',
  ],
  // parserOptions: {
  //   parser: '@typescript-eslint/parser',
  //   ecmaVersion: 2020
  // },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     printWidth: 120, // 单行长度，默认80
    //     singleQuote: true, // 单引号
    //     trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号
    //     bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    //     jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
    //     semi: false,
    //     endOfLine: 'auto' // 换行格式不做检查，换行格式有lf、cr，由于历史原因，windows下和linux下的文本文件的换行符不一致。
    //   }
    // ],
    semi: [2, 'never'], // 语句强制分号结尾
    'no-prototype-builtins': 0, // 禁止使用对象原型上的部分方法
    'vue/component-name-in-template-casing': [
      2,
      'kebab-case',
      {
        // 组件名在template中的书写方式
        registeredComponentsOnly: true, // 只检测注册的组件
        ignores: []
      }
    ],
    eqeqeq: [1, 'allow-null'], // 使用 === 替代 ==
    '@typescript-eslint/camelcase': [0, { properties: 'always' }],
    // "no-unused-vars": [0],
    // "@typescript-eslint/no-unused-vars": [1],
    '@typescript-eslint/no-var-requires': [0]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
