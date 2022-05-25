var r=`/**\r
 * \u8868\u683C\u7684\u57FA\u7840\u4F7F\u7528\r
 */\r
import { MlTable, MlTableProps } from "types/table";\r
import Vue from "vue";\r
\r
const tableData = [\r
  {\r
    idCcNewsManage: "8f3122df-d0a0-4ee5-8d00-65c559c8d8e3",\r
    newsCategory: "",\r
    newsTitle: "1",\r
    glanceNum: 0,\r
    newsSort: 0,\r
    publishTime: "2020-01-14 16:36:55",\r
    newsSource: "1002",\r
    newsStatus: "0",\r
    newsPromulgator: "\u53D1\u5E03\u4EBA",\r
    newsModel: "2",\r
    delFlag: "",\r
    creatTime: "2020-01-14 16:19:56",\r
    creatUser: "",\r
    updateTime: "2020-02-25 16:58:06",\r
    updateUser: "",\r
    delUser: "",\r
    remark: "",\r
    newsContent: "<p>111111</p>",\r
    sourceName: "",\r
    modelName: "",\r
    ids: "",\r
    fileIds: [\r
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606369809299&di=af56d824b57283f20e7b5edd0bf99c05&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F18%2F37%2F01300000342079124824374452584.jpg",\r
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606369809299&di=af56d824b57283f20e7b5edd0bf99c05&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F18%2F37%2F01300000342079124824374452584.jpg",\r
    ],\r
    svg: "activate",\r
  },\r
];\r
\r
const tableRes = {\r
  content: tableData,\r
  // content: [], // tableData, // Array(6).fill(tableData[0]),\r
  total: 1,\r
};\r
\r
let options = [\r
  { label: "\u603C\u603C", value: 1 },\r
  { label: "\u51A0\u519B", value: 2 },\r
];\r
\r
export default Vue.extend({\r
  name: "TableBase",\r
  data() {\r
    return {\r
      tableConfig: null as MlTableProps,\r
      hideOneColumn: false,\r
    };\r
  },\r
  created() {\r
    this.tableConfig = {\r
      searchConfig: {\r
        config: {\r
          columns: [\r
            {\r
              type: "string",\r
              label: "\u901A\u77E5\u516C\u544A",\r
              prop: "title",\r
            },\r
            {\r
              type: "select",\r
              label: "\u901A\u77E5\u7C7B\u578B",\r
              prop: "type",\r
              optionsGet: () => Promise.resolve(options),\r
            },\r
            {\r
              type: "datetimerange",\r
              label: "\u521B\u5EFA\u65F6\u95F4",\r
              prop: "times",\r
            },\r
            {\r
              type: "string",\r
              label: "\u901A\u77E5\u516C\u544A",\r
              prop: "title1",\r
            },\r
          ],\r
        },\r
      },\r
      // \u53C2\u6570\u7684\u8F6C\u6362\u51FD\u6570\u3002\u53EF\u4EE5\u76F4\u63A5\u5728api\u3001\u7684list\u4E2D\u5904\u7406\r
      beforeGetList: (type, params) => ({ ...params, a: 123 }),\r
      afterGetList: (type, data) => console.log(type, data),\r
      searchData: {},\r
      outerBtn: [\r
        { size: "small", name: "\u91CD\u65B0\u8BF7\u6C42options", type: "primary", callback: this.reFormOptions },\r
        {\r
          evtType: "setValue",\r
          size: "small",\r
          name: "\u663E\u793A\u9690\u85CF",\r
          type: "primary",\r
          showJudge: (data) => data.length > 0,\r
        },\r
        {\r
          type: "text",\r
          evtType: "mldelete",\r
          name: "\u5220\u9664",\r
        },\r
      ],\r
\r
      innerBtn: [\r
        {\r
          type: "text",\r
          evtType: "mldelete",\r
          name: "\u5220\u9664",\r
          showJudge: { newsTitle: "1", newsModel: "2" },\r
        },\r
      ],\r
      paginationConfig: {\r
        background: true,\r
        pageSizes: [10, 20, 30, 40],\r
        pageSize: 10,\r
      },\r
      config: {\r
        selection: true, // \u591A\u9009\uFF0C\u9ED8\u8BA4true\r
        index: true, // \u5E8F\u53F7 \u9ED8\u8BA4false\r
        // tableTree: true, // \u662F\u5426tree\uFF0C\u5C5E\u6027\u8868\u683C\uFF0C\u6839\u636E\u4E1A\u52A1\u52A0\u4E0A\u7684\r
        tableKey: "idCcNewsManage", // \u4E3B\u952E\uFF0C\u9ED8\u8BA4id\r
        tableOptWidth: "130px", // \u8868\u683C\u64CD\u4F5C\u5BBD\u5EA6\r
        initSearch: true, // \u521D\u59CB\u5316\u7684\u65F6\u5019\uFF0C\u662F\u5426\u76F4\u63A5\u8BF7\u6C42\u6570\u636E\uFF0C\r
        nodeData: {\r
          props: {\r
            height: "500px",\r
          },\r
        },\r
        // \u8868\u683C\u64CD\u4F5C\u63A5\u53E3\r
        api: {\r
          list: (params) => {\r
            console.log(JSON.stringify(params));\r
            // const data = new Array(10).fill(tableData)\r
            return new Promise((resolve) => {\r
              setTimeout(() => {\r
                resolve(tableRes);\r
              }, 5000);\r
            });\r
          },\r
          delete: (ids, data) => {\r
            console.log(ids, data);\r
            this.onDelete();\r
            return Promise.resolve();\r
          },\r
        },\r
        columns: [\r
          {\r
            type: "string",\r
            label: "\u6392\u5E8F",\r
            prop: "newsSort",\r
            sortable: "custom",\r
          },\r
          {\r
            type: "string",\r
            label: "\u6807\u9898",\r
            prop: "newsTitle",\r
            key: "newsTitle1", // \u91CD\u590Dprop\u65F6\uFF0C\u9700\u8981\u7ED9\u5176\u4E2D\u4E00\u4E2A\u6307\u5B9A\u4E00\u4E2A\u4E0D\u540C\u7684key\r
            // sortable: true,\r
            render: (h, params) => {\r
              return (\r
                <div\r
                  onClick={this.onDetail.bind(this, params.row)}\r
                  style={\`color: #1EA1FF; text-decoration: underline;cursor: pointer;\`}\r
                >\r
                  {params.row.newsTitle}\r
                </div>\r
              );\r
            },\r
          },\r
          {\r
            type: "string",\r
            label: "\u6807\u9898",\r
            prop: "newsTitle",\r
          },\r
          {\r
            type: "string",\r
            label: "\u53D1\u5E03\u4EBA",\r
            prop: "newsPromulgator",\r
            hide: () => this.hideOneColumn,\r
          },\r
          {\r
            type: "string",\r
            label: "\u6D4F\u89C8\u91CF",\r
            prop: "glanceNum",\r
          },\r
          {\r
            type: "svg",\r
            label: "\u56FE\u6807",\r
            prop: "svg",\r
            statusJudge: () => "success",\r
            // icons: icons\r
          },\r
          {\r
            label: "\u53D1\u5E03\u65F6\u95F4",\r
            prop: "publishTime",\r
            statusJudge: {\r
              success: { newsTitle: "1", newsModel: "2" },\r
              error: { newsTitle: "1", newsModel: "2" },\r
              warning: { newsTitle: "1", newsModel: "2" },\r
              done: { newsTitle: "1", newsModel: "2" },\r
              failed: { newsTitle: "1", newsModel: "2" },\r
            },\r
            formatter: () => "slajdfkld",\r
          },\r
          {\r
            label: "\u66F4\u65B0\u65F6\u95F4",\r
            prop: "updateTime",\r
          },\r
          {\r
            label: "\u521B\u5EFA\u65F6\u95F4",\r
            prop: "creatTime",\r
          },\r
          {\r
            type: "select",\r
            label: "\u72B6\u6001",\r
            prop: "newsStatus",\r
            options: [\r
              { label: "\u5DF2\u63D0\u4EA4", value: "0" },\r
              { label: "\u5DF2\u4E0A\u67B6", value: "1" },\r
              { label: "\u5DF2\u4E0B\u67B6", value: "2" },\r
            ],\r
          },\r
\r
          {\r
            type: "select",\r
            label: "\u7ED3\u6784\u6A21\u5F0F",\r
            prop: "newsModel",\r
            options: [\r
              {\r
                value: "1",\r
                label: "\u4E0A\u4E0B\u7ED3\u6784",\r
              },\r
              {\r
                value: "2",\r
                label: "\u5DE6\u53F3\u7ED3\u6784",\r
              },\r
            ],\r
          },\r
          {\r
            type: "image",\r
            label: "\u5C01\u9762\u56FE\u7247",\r
            prop: "fileIds",\r
            statusJudge: {\r
              error: { newsTitle: "1", newsModel: "2" },\r
            },\r
          },\r
          {\r
            label: "\u81EA\u5B9A\u4E49\u5217",\r
            prop: "fileIds",\r
            renderColumn(h) {\r
              return (\r
                <el-table-column\r
                  label="\u81EA\u5B9A\u4E49\u5217"\r
                  scopedSlots={{\r
                    default: () => {\r
                      return <span>1234</span>;\r
                    },\r
                  }}\r
                ></el-table-column>\r
              );\r
            },\r
          },\r
          // {\r
          //   tag: 'ml-editor', //'c-table',\r
          //   label: '\u65B0\u95FB\u5185\u5BB9',\r
          //   prop: 'newsContent',\r
          //   block: true,\r
          //   showTable: false\r
          // }\r
\r
          // {\r
          //   type: 'string',\r
          //   label: '\u56FE\u6807\u540D\u79F0',\r
          //   prop: 'icon',\r
          //   showTable: true, // \u662F\u5426\u5728\u8868\u683C\u4E2D\u5C55\u793A\r
          //    // \u641C\u7D22\u65F6\u4F7F\u7528\uFF0C\u9ED8\u8BA4false\r
          //   addForm: true, // \u65B0\u589E\u65F6\u4F7F\u7528\uFF0C\u9ED8\u8BA4true\r
          //   editForm: true, // \u7F16\u8F91\u65F6\u4F7F\u7528\uFF0C\u9ED8\u8BA4true\r
          //   viewForm: true, // \u67E5\u770B\u662F\u4F7F\u7528\uFF0C\u9ED8\u8BA4true\r
        ],\r
      },\r
    };\r
  },\r
  methods: {\r
    onDelete() {\r
      this.$message.success("\u5220\u9664xxxxx");\r
    },\r
    onDetail() {\r
      this.$message.success("\u67E5\u770B\u8BE6\u60C5");\r
      this.hideOneColumn = !this.hideOneColumn;\r
    },\r
    reFormOptions() {\r
      options = [{ label: "\u6613\u5B89", value: 1 }];\r
      (this.$refs.mainTable as MlTable).mlForm.reloadOptions("type");\r
    },\r
  },\r
  render() {\r
    return <ml-table ref="mainTable" props={this.tableConfig}></ml-table>;\r
  },\r
});\r
`;export{r as default};
