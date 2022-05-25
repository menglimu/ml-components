var r=`/**\r
 * \u8868\u5355\u5168\u5C40\u5C5E\u6027\u914D\u7F6E\r
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
      setConfig: null as MlFormConfig,\r
      setValue: null,\r
    };\r
  },\r
  created() {\r
    this.formConfig = {\r
      columns: [\r
        {\r
          type: "input",\r
          label: "\u59D3\u540D",\r
          prop: "name",\r
        },\r
        {\r
          type: "input",\r
          label: "\u957F\u5EA6",\r
          prop: "length",\r
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
      ],\r
    };\r
    this.setConfig = {\r
      inline: false,\r
      columns: [\r
        {\r
          type: "radio",\r
          label: "\u8868\u5355\u6837\u5F0F",\r
          prop: "uiType",\r
          options: [\r
            { value: "line", label: "line" },\r
            { value: "round", label: "round" },\r
            { value: "border", label: "border" },\r
          ],\r
        },\r
        {\r
          type: "radio",\r
          label: "\u884C\u5185\u8868\u5355",\r
          prop: "inline",\r
          options: [\r
            { label: "\u662F", value: true },\r
            { label: "\u5426", value: false },\r
          ],\r
        },\r
        {\r
          type: "radio",\r
          label: "\u6807\u7B7E\u4F4D\u7F6E",\r
          prop: "labelPosition",\r
          options: [\r
            { value: "left", label: "\u5DE6\u5BF9\u9F50" },\r
            { value: "right", label: "\u53F3\u5BF9\u9F50" },\r
            { value: "top", label: "\u9876\u90E8\u5BF9\u9F50" },\r
          ],\r
        },\r
      ],\r
    };\r
  },\r
  mounted() {\r
    this.$watch(\r
      "setValue",\r
      () => {\r
        this.formConfig = { ...this.formConfig, ...this.setValue };\r
      },\r
      { deep: true },\r
    );\r
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
        <ml-form ref="form" config={this.setConfig} v-model={this.setValue}></ml-form>\r
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>\r
      </div>\r
    );\r
  },\r
});\r
`;export{r as default};
