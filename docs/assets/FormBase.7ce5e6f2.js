var r=`/**\r
 * \u8868\u5355\u57FA\u7840\r
 */\r
import Vue from "vue";\r
import { MlForm, MlFormConfig } from "types/form";\r
import CustomCascader from "@/components/CustomCascader";\r
\r
function optionsGet() {\r
  return Promise.resolve([\r
    { value: 1, label: "\u7537" },\r
    { value: 0, label: "\u5973" },\r
  ]);\r
}\r
\r
export default Vue.extend({\r
  name: "FormBase",\r
  data() {\r
    return {\r
      formConfig: null as MlFormConfig,\r
      formValue: null,\r
    };\r
  },\r
  created() {\r
    this.formConfig = {\r
      labelPosition: "top",\r
      columns: [\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name" },\r
        {\r
          type: "select",\r
          label: "\u6027\u522B",\r
          prop: "type",\r
          required: true,\r
          value: 0,\r
          options: [\r
            { value: 1, label: "\u7537" },\r
            { value: 0, label: "\u5973" },\r
          ],\r
        },\r
        { label: "\u6027\u522B", prop: "sex", type: "select", optionsGet, show: (data) => data.type === 1 },\r
        {\r
          label: "\u81EA\u5B9A\u4E49",\r
          prop: "render",\r
          type: "select",\r
          required: true,\r
          block: true,\r
          optionsGet,\r
          render: () => <CustomCascader options={[{ label: "\u5317\u4EAC", value: 1 }]} />,\r
        },\r
        { label: "\u5907\u6CE8", prop: "marks", type: "textarea", block: true },\r
      ],\r
    };\r
  },\r
  methods: {\r
    async onSubmit() {\r
      await (this.$refs.form as MlForm).validate();\r
      return new Promise((resolve) => {\r
        setTimeout(() => {\r
          this.$message.success("\u63D0\u4EA4\u6210\u529F");\r
          resolve(1);\r
        }, 5000);\r
      });\r
    },\r
    onReset() {\r
      (this.$refs.form as MlForm).reset();\r
    },\r
  },\r
  render() {\r
    return (\r
      <div>\r
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>\r
        <div>\r
          <el-button type="primary" onClick={this.onSubmit}>\r
            \u63D0\u4EA4\r
          </el-button>\r
          <el-button onClick={this.onReset}>\u91CD\u7F6E</el-button>\r
        </div>\r
        <p>\u5F53\u524D\u8868\u5355\u8F93\u51FA\u503C\uFF1A{JSON.stringify(this.formValue)}</p>\r
      </div>\r
    );\r
  },\r
});\r
`;export{r as default};
