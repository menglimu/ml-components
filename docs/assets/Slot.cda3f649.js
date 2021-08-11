export default'/**\r\n * 表格slot\r\n */\r\nimport Vue from "vue";\r\nimport { MlTable, MlTableProps } from "types/table";\r\n\r\nlet data = {\r\n  content: [\r\n    // { name: "辛弃疾", sentence: "醉里挑灯看剑，梦回吹角连营", occupation: "起义军", remark: "杀贼！杀贼！杀贼" },\r\n    // { name: "苏东坡", sentence: "一蓑烟雨任平生", occupation: "老饕", remark: "问汝平生功业" },\r\n    // { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },\r\n  ],\r\n  total: 1,\r\n};\r\n\r\nexport default Vue.extend({\r\n  name: "TableSearch",\r\n  data() {\r\n    return {\r\n      tableConfig: null as MlTableProps,\r\n    };\r\n  },\r\n  created() {\r\n    this.tableConfig = {\r\n      innerBtn: [{ name: "打榜", type: "text" }],\r\n      config: {\r\n        api: {\r\n          list: (params) => {\r\n            console.log(params);\r\n            return new Promise((resolve) => {\r\n              setTimeout(() => {\r\n                resolve(data);\r\n              }, 2000);\r\n            });\r\n          },\r\n        },\r\n        columns: [\r\n          { label: "姓名", prop: "name" },\r\n          { label: "名句", prop: "sentence" },\r\n          { label: "职业", prop: "occupation" },\r\n          { label: "备注", prop: "remark" },\r\n        ],\r\n      },\r\n      searchConfig: {\r\n        config: {\r\n          columns: [{ label: "姓名", prop: "name" }],\r\n        },\r\n      },\r\n    };\r\n  },\r\n  mounted() {},\r\n  methods: {},\r\n  render() {\r\n    return (\r\n      <div>\r\n        <ml-table\r\n          ref="mainTable"\r\n          props={this.tableConfig}\r\n          scopedSlots={{\r\n            search: ({ search, reset }) => (\r\n              <div>\r\n                这是搜索框自定义 <el-button onClick={search}>搜索</el-button>{" "}\r\n                <el-button onClick={reset}>重置</el-button>\r\n              </div>\r\n            ),\r\n          }}\r\n        >\r\n          <div>表格和搜索框之间的默认slot</div>\r\n          <div slot="empty">没得数据的slot</div>\r\n        </ml-table>\r\n        <br></br>\r\n        <br></br>\r\n        <br>表单内容自定义</br>\r\n        <ml-table\r\n          props={this.tableConfig}\r\n          scopedSlots={{\r\n            table: ({ data, columns }) => (\r\n              <div>\r\n                {columns.map((item) => (\r\n                  <span>{item.label}&nbsp;&nbsp;&nbsp;&nbsp;</span>\r\n                ))}\r\n              </div>\r\n            ),\r\n          }}\r\n        ></ml-table>\r\n      </div>\r\n    );\r\n  },\r\n});\r\n';
