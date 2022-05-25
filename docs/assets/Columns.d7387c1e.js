var r=`/**\r
 * \u8868\u683C\u914D\u7F6E\r
 */\r
import Vue from "vue";\r
import { MlTable, MlTableProps } from "types/table";\r
\r
let data = {\r
  content: [\r
    {\r
      name: "\u970D\u53BB\u75C5",\r
      sentence: "\u5308\u5974\u672A\u706D\u4F55\u4EE5\u5BB6\u4E3A",\r
      occupation: "\u51A0\u519B\u4FAF",\r
      remark: "\u5C01\u72FC\u5C45\u80E5\uFF0C\u996E\u9A6C\u7FF0\u6D77",\r
      status: 1,\r
      image: "https://img2.baidu.com/it/u=2102736929,2417598652&fm=26&fmt=auto&gp=0.jpg",\r
    },\r
    {\r
      name: "\u8F9B\u5F03\u75BE",\r
      sentence: "\u9189\u91CC\u6311\u706F\u770B\u5251\uFF0C\u68A6\u56DE\u5439\u89D2\u8FDE\u8425",\r
      occupation: "\u8D77\u4E49\u519B",\r
      remark: "\u6740\u8D3C\uFF01\u6740\u8D3C\uFF01\u6740\u8D3C",\r
      status: 2,\r
      image: [\r
        "https://img0.baidu.com/it/u=1514002029,2035215441&fm=26&fmt=auto&gp=0.jpg",\r
        "https://img2.baidu.com/it/u=2116882029,1761299726&fm=26&fmt=auto&gp=0.jpg",\r
      ],\r
    },\r
    {\r
      name: "\u82CF\u4E1C\u5761",\r
      sentence: "\u4E00\u84D1\u70DF\u96E8\u4EFB\u5E73\u751F",\r
      occupation: "\u8001\u9955",\r
      remark: "\u95EE\u6C5D\u5E73\u751F\u529F\u4E1A",\r
      status: 3,\r
      image: ["https://img1.baidu.com/it/u=600451725,8030365&fm=26&fmt=auto&gp=0.jpg"],\r
    },\r
    {\r
      name: "\u674E\u6E05\u7167",\r
      sentence: "\u81F3\u4ECA\u601D\u9879\u7FBD\uFF0C\u4E0D\u80AF\u8FC7\u6C5F\u4E1C",\r
      occupation: "\u603C\u603C",\r
      remark: "\u6613\u5B89\u5927\u4EBA",\r
      status: 4,\r
      image: "https://img0.baidu.com/it/u=478088386,2867763503&fm=26&fmt=auto&gp=0.jpg",\r
    },\r
    {\r
      name: "\u9676\u6E0A\u660E",\r
      sentence: "\u7F81\u9E1F\u604B\u65E7\u6797\uFF0C\u6C60\u9C7C\u601D\u6545\u6E0A",\r
      occupation: "\u4E94\u67F3\u5148\u751F",\r
      remark: "\u4E0D\u4E3A\u4E94\u6597\u7C73\u6298\u8170",\r
      status: 5,\r
      image: "https://img2.baidu.com/it/u=3084029894,4148570719&fm=26&fmt=auto&gp=0.jpg",\r
    },\r
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
      innerBtn: [{ name: "\u663E\u793A\u9690\u85CF", type: "text", callback: this.onDetail }],\r
      config: {\r
        api: {\r
          list: (params) => {\r
            console.log(params);\r
            return Promise.resolve(data);\r
          },\r
        },\r
        columns: [\r
          { label: "\u59D3\u540D", prop: "name" },\r
          { label: "\u540D\u53E5", prop: "sentence", minWidth: "200" },\r
          { label: "\u804C\u4E1A", prop: "occupation" },\r
          { label: "\u5907\u6CE8", prop: "remark" },\r
\r
          {\r
            label: "\u6807\u9898",\r
            prop: "render",\r
            key: "newsTitle1", // \u91CD\u590Dprop\u65F6\uFF0C\u9700\u8981\u7ED9\u5176\u4E2D\u4E00\u4E2A\u6307\u5B9A\u4E00\u4E2A\u4E0D\u540C\u7684key\r
            // sortable: true,\r
            render: (h, params) => {\r
              return (\r
                <div\r
                  onClick={this.onDetail.bind(this, params.row)}\r
                  style={\`color: #1EA1FF; text-decoration: underline;cursor: pointer;\`}\r
                >\r
                  {params.row.render} - \u81EA\u5B9A\u4E49render\r
                </div>\r
              );\r
            },\r
          },\r
\r
          {\r
            type: "select",\r
            label: "\u72B6\u6001",\r
            prop: "status",\r
            statusJudge: {\r
              success: { status: 1, name: "\u970D\u53BB\u75C5" },\r
              error: { status: 2 },\r
              warning: { status: 3 },\r
              done: { status: 4 },\r
              failed: { status: 5 },\r
            },\r
            options: [\r
              {\r
                value: 1,\r
                label: "\u9AA0\u9A91\u5C06\u519B",\r
                children: [{ value: 2, label: "\u6587\u6B66\u53CC\u5168" }],\r
              },\r
              {\r
                value: 3,\r
                label: "\u7F8E\u98DF\u5BB6",\r
              },\r
              {\r
                value: 4,\r
                label: "\u6DF1\u5EA6\u6E38\u620F\u73A9\u5BB6",\r
              },\r
              {\r
                value: 5,\r
                label: "\u79CD\u7530\u7684",\r
              },\r
            ],\r
          },\r
          {\r
            type: "image",\r
            label: "\u56FE\u7247",\r
            prop: "image",\r
          },\r
          {\r
            type: "svg",\r
            label: "svg\u77E2\u91CF\u56FE",\r
            prop: "svg",\r
            hide: true,\r
          },\r
          {\r
            label: "\u81EA\u5B9A\u4E49\u5217",\r
            prop: "fileIds",\r
            renderColumn(h) {\r
              return (\r
                <el-table-column\r
                  label="\u81EA\u5B9A\u4E49\u5217"\r
                  scopedSlots={{\r
                    default: (scope) => {\r
                      return <span>\u53EF\u901A\u8FC7scope\u8FDB\u884C\u5185\u5BB9\u7684\u5C55\u793A</span>;\r
                    },\r
                  }}\r
                ></el-table-column>\r
              );\r
            },\r
          },\r
        ],\r
      },\r
    };\r
  },\r
  mounted() {\r
    setTimeout(() => {\r
      let mlTable = this.$refs.mainTable as MlTable;\r
      mlTable.refresh();\r
    }, 6000);\r
  },\r
  methods: {\r
    onDetail() {\r
      this.$message("\u70B9\u51FB");\r
      this.tableConfig.config.columns.find((item) => item.prop === "svg").hide = !this.tableConfig.config.columns.find(\r
        (item) => item.prop === "svg",\r
      ).hide;\r
    },\r
  },\r
  render() {\r
    return <ml-table ref="mainTable" props={this.tableConfig}></ml-table>;\r
  },\r
});\r
`;export{r as default};
