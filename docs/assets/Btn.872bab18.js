var n=`/**\r
 * \u8868\u683C\u6309\u94AE\r
 */\r
import Vue from "vue";\r
import { MlTableProps } from "types/table";\r
\r
let data = {\r
  content: [\r
    { name: "\u8F9B\u5F03\u75BE", sentence: "\u9189\u91CC\u6311\u706F\u770B\u5251\uFF0C\u68A6\u56DE\u5439\u89D2\u8FDE\u8425", occupation: "\u8D77\u4E49\u519B", remark: "\u6740\u8D3C\uFF01\u6740\u8D3C\uFF01\u6740\u8D3C" },\r
    { name: "\u82CF\u4E1C\u5761", sentence: "\u4E00\u84D1\u70DF\u96E8\u4EFB\u5E73\u751F", occupation: "\u8001\u9955", remark: "\u95EE\u6C5D\u5E73\u751F\u529F\u4E1A" },\r
    { name: "\u674E\u6E05\u7167", sentence: "\u81F3\u4ECA\u601D\u9879\u7FBD\uFF0C\u4E0D\u80AF\u8FC7\u6C5F\u4E1C", occupation: "\u603C\u603C", remark: "\u6613\u5B89\u5927\u4EBA" },\r
  ],\r
  total: 1,\r
};\r
\r
export default Vue.extend({\r
  name: "TableSearch",\r
  data() {\r
    return {\r
      tableConfig: null as MlTableProps,\r
      user: "\u7BA1\u7406\u5458",\r
    };\r
  },\r
  created() {\r
    this.tableConfig = {\r
      innerBtn: [\r
        { name: "\u4FEE\u6539", showJudge: (row) => row.name !== "\u674E\u6E05\u7167" },\r
        { name: "\u6253\u699C", type: "text", showJudge: { name: "\u674E\u6E05\u7167" } },\r
      ],\r
      outerBtn: [\r
        { name: "\u5355\u9009\u53EF\u7528", selection: "single", showJudge: () => this.user === "\u7BA1\u7406\u5458" },\r
        { name: "\u65B0\u589Eevt", type: "primary", Elicon: "", evtType: "add" },\r
        { name: "\u65B0\u589Ecallback", icon: "", callback: this.onAdd },\r
        { render: () => <el-button>\u81EA\u5B9A\u4E49\u6309\u94AE</el-button> },\r
      ],\r
      searchConfig: {\r
        config: {\r
          columns: [\r
            { label: "\u59D3\u540D", prop: "name" },\r
            { label: "\u540D\u53E5", prop: "sentence" },\r
            { label: "\u804C\u4E1A", prop: "occupation" },\r
            { label: "\u5907\u6CE8", prop: "remark" },\r
          ],\r
        },\r
      },\r
      config: {\r
        selection: true,\r
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
  methods: {\r
    onAdd() {\r
      this.$message("callback \u70B9\u51FB\u56DE\u8C03");\r
    },\r
    onAddEvt() {\r
      this.$message("evt \u70B9\u51FB\u56DE\u8C03");\r
    },\r
  },\r
  render() {\r
    return <ml-table props={this.tableConfig} onAdd={this.onAddEvt}></ml-table>;\r
  },\r
});\r
`;export{n as default};
