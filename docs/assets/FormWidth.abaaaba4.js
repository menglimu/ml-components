export default'/**\r\n * 表单的项的长度的控制\r\n */\r\nimport { MlFormConfig } from "types/form";\r\nimport Vue from "vue";\r\n\r\nexport default Vue.extend({\r\n  name: "FormWidth",\r\n  data() {\r\n    return {\r\n      formConfig: null as MlFormConfig,\r\n      formValue: null,\r\n    };\r\n  },\r\n  created() {\r\n    this.formConfig = {\r\n      labelWidth: "100px",\r\n      itemWidth: "400px",\r\n      // itemMaxWidth: "100%",\r\n      columns: [\r\n        {\r\n          label: "姓名",\r\n          itemBoxWidth: "50%",\r\n          itemWidth: "500px",\r\n          placeholder: "姓名姓名姓名",\r\n          prop: "name",\r\n        },\r\n        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name1" },\r\n        { label: "姓名", labelWidth: "120px", placeholder: "姓名姓名姓名", prop: "name2" },\r\n        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name3" },\r\n        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name4" },\r\n        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name5" },\r\n        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name6" },\r\n        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name7" },\r\n        { label: "姓名", block: true, placeholder: "姓名姓名姓名", prop: "name8" },\r\n        { label: "姓名", itemMaxWidth: "230px", placeholder: "姓名姓名姓名", prop: "name9" },\r\n      ],\r\n    };\r\n  },\r\n  methods: {},\r\n  render() {\r\n    return (\r\n      <div>\r\n        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>\r\n      </div>\r\n    );\r\n  },\r\n});\r\n';