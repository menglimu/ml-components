var r=`/**\r
 * \u8868\u5355\u9A8C\u8BC1\r
 */\r
import Vue from "vue";\r
import { MlForm, MlFormConfig } from "types/form";\r
\r
export default Vue.extend({\r
  name: "FormRule",\r
  data() {\r
    return {\r
      formConfig: null as MlFormConfig,\r
      formValue: null,\r
    };\r
  },\r
  created() {\r
    this.formConfig = {\r
      rules: {\r
        name: [\r
          { required: true, message: "\u8BF7\u8F93\u5165\u6D3B\u52A8\u540D\u79F0", trigger: "blur" },\r
          { min: 3, max: 5, message: "\u957F\u5EA6\u5728 3 \u5230 5 \u4E2A\u5B57\u7B26", trigger: "blur" },\r
        ],\r
      },\r
      columns: [\r
        {\r
          type: "input",\r
          label: "\u59D3\u540D",\r
          prop: "name",\r
          reg: /sdf/,\r
          error: "\u8BF7\u91CD\u65B0\u8F93\u5165",\r
        },\r
        {\r
          type: "input",\r
          label: "\u957F\u5EA6",\r
          prop: "length",\r
          minlength: 12,\r
        },\r
        {\r
          type: "select",\r
          label: "\u6027\u522B",\r
          prop: "type",\r
          required: true,\r
          options: [\r
            { value: 1, label: "\u7537" },\r
            { value: 0, label: "\u5973" },\r
          ],\r
        },\r
        {\r
          type: "input",\r
          label: "\u5BC6\u7801",\r
          prop: "pass",\r
          required: true,\r
          rules: [\r
            {\r
              validator: (rule, value, callback) => {\r
                if (value === "") {\r
                  callback(new Error("\u8BF7\u8F93\u5165\u5BC6\u7801"));\r
                } else {\r
                  if (this.formValue.checkPass !== "") {\r
                    (this.$refs.form as MlForm).validateField("checkPass");\r
                  }\r
                  callback();\r
                }\r
              },\r
              trigger: "blur",\r
            },\r
          ],\r
        },\r
        {\r
          type: "input",\r
          label: "\u786E\u8BA4\u5BC6\u7801",\r
          prop: "checkPass",\r
          required: true,\r
          rules: [\r
            {\r
              validator: (rule, value, callback) => {\r
                if (value === "") {\r
                  callback(new Error("\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"));\r
                } else if (value !== this.formValue.pass) {\r
                  callback(new Error("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4!"));\r
                } else {\r
                  callback();\r
                }\r
              },\r
              trigger: "blur",\r
            },\r
          ],\r
        },\r
      ],\r
    };\r
  },\r
  methods: {\r
    onSubmit() {\r
      let form = this.$refs.form as MlForm;\r
      form.validate();\r
    },\r
  },\r
  render() {\r
    return (\r
      <div>\r
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>\r
        <el-button onClick={this.onSubmit}>\u63D0\u4EA4</el-button>\r
      </div>\r
    );\r
  },\r
});\r
`;export{r as default};
