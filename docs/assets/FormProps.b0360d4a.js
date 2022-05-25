var r=`/**\r
 * \u8868\u5355\u53C2\u6570\u4F20\u5165\r
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
      columns: [\r
        {\r
          type: "select",\r
          label: "\u957F\u5EA6",\r
          prop: "length",\r
          options: [\r
            { label: "\u675C\u752B", value: 1 },\r
            { label: "\u674E\u767D", value: 2 },\r
            { label: "\u8F9B\u5F03\u75BE", value: 12 },\r
          ],\r
          nodeData: {\r
            props: { placeholder: "\u8BF7\u9009\u62E9123" },\r
            attrs: { style: "width: 600px;" },\r
          },\r
          props: {\r
            multiple: true,\r
          },\r
          attrs: {\r
            class: "select1235",\r
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
      </div>\r
    );\r
  },\r
});\r
`;export{r as default};
