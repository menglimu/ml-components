var r=`/**\r
 * \u8868\u5355\u7684\u9879\u7684\u957F\u5EA6\u7684\u63A7\u5236\r
 */\r
import { MlFormConfig } from "types/form";\r
import Vue from "vue";\r
\r
export default Vue.extend({\r
  name: "FormWidth",\r
  data() {\r
    return {\r
      formConfig: null as MlFormConfig,\r
      formValue: null,\r
    };\r
  },\r
  created() {\r
    this.formConfig = {\r
      labelWidth: "100px",\r
      itemWidth: "400px",\r
      // itemMaxWidth: "100%",\r
      columns: [\r
        {\r
          label: "\u59D3\u540D",\r
          itemBoxWidth: "50%",\r
          itemWidth: "500px",\r
          placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D",\r
          prop: "name",\r
        },\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name1" },\r
        { label: "\u59D3\u540D", labelWidth: "120px", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name2" },\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name3" },\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name4" },\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name5" },\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name6" },\r
        { label: "\u59D3\u540D", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name7" },\r
        { label: "\u59D3\u540D", block: true, placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name8" },\r
        { label: "\u59D3\u540D", itemMaxWidth: "230px", placeholder: "\u59D3\u540D\u59D3\u540D\u59D3\u540D", prop: "name9" },\r
      ],\r
    };\r
  },\r
  methods: {},\r
  render() {\r
    return (\r
      <div>\r
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>\r
      </div>\r
    );\r
  },\r
});\r
`;export{r as default};
