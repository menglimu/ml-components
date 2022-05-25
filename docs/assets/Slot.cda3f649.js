var n=`/**\r
 * \u8868\u683Cslot\r
 */\r
import Vue from "vue";\r
import { MlTable, MlTableProps } from "types/table";\r
\r
let data = {\r
  content: [\r
    // { name: "\u8F9B\u5F03\u75BE", sentence: "\u9189\u91CC\u6311\u706F\u770B\u5251\uFF0C\u68A6\u56DE\u5439\u89D2\u8FDE\u8425", occupation: "\u8D77\u4E49\u519B", remark: "\u6740\u8D3C\uFF01\u6740\u8D3C\uFF01\u6740\u8D3C" },\r
    // { name: "\u82CF\u4E1C\u5761", sentence: "\u4E00\u84D1\u70DF\u96E8\u4EFB\u5E73\u751F", occupation: "\u8001\u9955", remark: "\u95EE\u6C5D\u5E73\u751F\u529F\u4E1A" },\r
    // { name: "\u674E\u6E05\u7167", sentence: "\u81F3\u4ECA\u601D\u9879\u7FBD\uFF0C\u4E0D\u80AF\u8FC7\u6C5F\u4E1C", occupation: "\u603C\u603C", remark: "\u6613\u5B89\u5927\u4EBA" },\r
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
      innerBtn: [{ name: "\u6253\u699C", type: "text" }],\r
      config: {\r
        api: {\r
          list: (params) => {\r
            console.log(params);\r
            return new Promise((resolve) => {\r
              setTimeout(() => {\r
                resolve(data);\r
              }, 2000);\r
            });\r
          },\r
        },\r
        columns: [\r
          { label: "\u59D3\u540D", prop: "name" },\r
          { label: "\u540D\u53E5", prop: "sentence" },\r
          { label: "\u804C\u4E1A", prop: "occupation" },\r
          { label: "\u5907\u6CE8", prop: "remark" },\r
        ],\r
      },\r
      searchConfig: {\r
        config: {\r
          columns: [{ label: "\u59D3\u540D", prop: "name" }],\r
        },\r
      },\r
    };\r
  },\r
  mounted() {},\r
  methods: {},\r
  render() {\r
    return (\r
      <div>\r
        <ml-table\r
          ref="mainTable"\r
          props={this.tableConfig}\r
          scopedSlots={{\r
            search: ({ search, reset }) => (\r
              <div>\r
                \u8FD9\u662F\u641C\u7D22\u6846\u81EA\u5B9A\u4E49 <el-button onClick={search}>\u641C\u7D22</el-button>{" "}\r
                <el-button onClick={reset}>\u91CD\u7F6E</el-button>\r
              </div>\r
            ),\r
          }}\r
        >\r
          <div>\u8868\u683C\u548C\u641C\u7D22\u6846\u4E4B\u95F4\u7684\u9ED8\u8BA4slot</div>\r
          <div slot="empty">\u6CA1\u5F97\u6570\u636E\u7684slot</div>\r
        </ml-table>\r
        <br></br>\r
        <br></br>\r
        <br>\u8868\u5355\u5185\u5BB9\u81EA\u5B9A\u4E49</br>\r
        <ml-table\r
          props={this.tableConfig}\r
          scopedSlots={{\r
            table: ({ data, columns }) => (\r
              <div>\r
                {columns.map((item) => (\r
                  <span>{item.label}&nbsp;&nbsp;&nbsp;&nbsp;</span>\r
                ))}\r
              </div>\r
            ),\r
          }}\r
        ></ml-table>\r
      </div>\r
    );\r
  },\r
});\r
`;export{n as default};
