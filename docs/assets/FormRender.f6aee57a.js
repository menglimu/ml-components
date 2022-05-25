var r=`/**\r
 * \u8868\u5355\u81EA\u5B9A\u4E49\u7EC4\u4EF6\r
 */\r
import Vue from "vue";\r
import { MlForm, MlFormConfig } from "types/form";\r
\r
export default Vue.extend({\r
  name: "FormProps",\r
  data() {\r
    return {\r
      formConfig: null as MlFormConfig,\r
      formValue: null,\r
    };\r
  },\r
  created() {\r
    this.formConfig = {\r
      inline: false,\r
      columns: [\r
        {\r
          type: "",\r
          prop: "list1",\r
          label: "\u7EC6\u5316\u6307\u68071234",\r
          required: true,\r
          // eslint-disable-next-line\r
          render: () => {\r
            // \u81EA\u5B9A\u4E49\u7EC4\u4EF6\u3002\u4F1A\u81EA\u52A8\u7ED1\u5B9Avalue\u548Cinput\u4E8B\u4EF6\u3002\u4E0A\u9762\u7684\u7EC6\u5316\u6307\u6807demo\u3002\u53EF\u901A\u8FC7\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u6765\u5B9E\u73B0\u3002\r
            // disabled={true}\r
            // console.log(this, 12);\r
            return <el-input onInput={() => console.log(123567)} />;\r
          },\r
        },\r
        {\r
          render: () => (\r
            <div style={{ height: "1px", background: "#e6e6e6", width: "100%", marginBottom: "20px" }}></div>\r
          ),\r
        },\r
        {\r
          label: "\u957F\u5EA6",\r
          prop: "length",\r
          render(h, value, onInput) {\r
            return (\r
              <div>\r
                <el-button\r
                  onClick={() => {\r
                    const val = value ? [...value] : [];\r
                    val.push(val.length + 1);\r
                    onInput(val);\r
                  }}\r
                >\r
                  \u65B0\u589E\r
                </el-button>\r
                <ul>\r
                  {value?.map((item: any) => (\r
                    <li>{item}</li>\r
                  ))}\r
                </ul>\r
              </div>\r
            );\r
          },\r
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
        {JSON.stringify(this.formValue)}\r
      </div>\r
    );\r
  },\r
});\r
`;export{r as default};
