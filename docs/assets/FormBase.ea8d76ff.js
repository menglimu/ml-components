export default "/**\r\n * 表格基础\r\n */\r\nimport Vue from 'vue';\r\nimport { MlFormConfig } from 'types/form';\r\n\r\nexport default Vue.extend({\r\n  name: 'FormBase',\r\n  data() {\r\n    return {\r\n      formConfig: null as MlFormConfig,\r\n      formValue: {}\r\n    };\r\n  },\r\n  created() {\r\n    this.formConfig = {\r\n      columns: [{ label: '名字', prop: 'name' }]\r\n    };\r\n  },\r\n  methods: {},\r\n  render() {\r\n    return <ml-form config={this.formConfig} v-model={this.formValue}></ml-form>;\r\n  }\r\n});\r\n";
