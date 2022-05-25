var r=`/**\r
 * \u8868\u683C\u641C\u7D22\u9879\r
 */\r
import Vue from "vue";\r
import { MlTableProps } from "types/table";\r
\r
let data = {\r
  content: [\r
    { name: "\u8F9B\u5F03\u75BE", sentence: "\u9189\u91CC\u6311\u706F\u770B\u5251\uFF0C\u68A6\u56DE\u5439\u89D2\u8FDE\u8425", occupation: "\u8D77\u4E49\u519B", remark: "\u6740\u8D3C\uFF01\u6740\u8D3C\uFF01\u6740\u8D3C" },\r
    { name: "\u82CF\u4E1C\u5761", sentence: "\u4E00\u84D1\u70DF\u96E8\u4EFB\u5E73\u751F", occupation: "\u8001\u9955", remark: "\u95EE\u6C5D\u5E73\u751F\u529F\u4E1A" },\r
  ],\r
  total: 1,\r
};\r
\r
export default Vue.extend({\r
  name: "TableSearch",\r
  data() {\r
    return {\r
      tableConfig: null as MlTableProps,\r
    };\r
  },\r
  created() {\r
    this.tableConfig = {\r
      searchData: { name: 123, date: "2020 20-20-20" },\r
      searchConfig: {\r
        // isBtnInForm: true,\r
        // isOverHide: false,\r
        // aloneLineBtn: false,\r
        initialValue: { name: "\u970D\u53BB\u75C5" },\r
        config: {\r
          itemBoxWidth: "33.33%",\r
          columns: [\r
            { label: "\u59D3\u540D", prop: "name" },\r
            { label: "\u540D\u53E5", prop: "sentence", value: "\u7AF9\u6756\u8292\u978B\u8F7B\u80DC\u9A6C" },\r
            { label: "\u804C\u4E1A", prop: "occupation", itemBoxWidth: "50%" },\r
            { label: "\u5907\u6CE8", prop: "remark" },\r
            { label: "\u5907\u6CE81", prop: "remark1", itemBoxWidth: "50%" },\r
          ],\r
        },\r
      },\r
      config: {\r
        api: {\r
          list: (params) => {\r
            console.log(params);\r
            return Promise.resolve(data);\r
          },\r
        },\r
        columns: [\r
          { label: "\u59D3\u540D", prop: "name" },\r
          { label: "\u540D\u53E5", prop: "sentence" },\r
          { label: "\u804C\u4E1A", prop: "occupation" },\r
          { label: "\u5907\u6CE8", prop: "remark" },\r
        ],\r
      },\r
    };\r
  },\r
  methods: {},\r
  render() {\r
    return <ml-table props={this.tableConfig}></ml-table>;\r
  },\r
});\r
`;export{r as default};
