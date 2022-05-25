var r=`/**\r
 * \u56DE\u663E\u7EC4\u4EF6\u4F7F\u7528\u793A\u4F8B\r
 */\r
import Vue from "vue";\r
import style from "index.module.scss";\r
import { MlInfoProps } from "types/info";\r
\r
export default Vue.extend({\r
  name: "Base",\r
  data() {\r
    return {\r
      config: null as MlInfoProps,\r
      data: null,\r
    };\r
  },\r
  created() {\r
    this.config = {\r
      labelWidth: "80px",\r
      labelSuffix: "<_ : _>",\r
      title: "\u4E2A\u4EBA\u6982\u8981",\r
      columns: [\r
        {\r
          label: "\u59D3\u540D",\r
          prop: "name",\r
          labelWidth: "100px",\r
          className: "aaa",\r
          formatter: (value) => <span>{value}---\u6C38\u8FDC\u6EF4\u795E</span>,\r
        },\r
        { label: "\u540D\u53E5", prop: "sentence" },\r
        { label: "\u804C\u4E1A", prop: "occupation" },\r
        { label: "\u5907\u6CE8", prop: "remark" },\r
        {\r
          width: "100%",\r
          render: () => <div style={{ background: "#e7e7e7", height: "1px", width: "100%", margin: "10px 0" }}></div>,\r
        },\r
\r
        {\r
          label: "\u6807\u9898",\r
          prop: "render",\r
          // sortable: true,\r
          render: (h) => {\r
            return <span style={\`color: #1EA1FF; text-decoration: underline;cursor: pointer;\`}> - \u81EA\u5B9A\u4E49render</span>;\r
          },\r
        },\r
\r
        {\r
          type: "select",\r
          label: "\u72B6\u6001",\r
          prop: "status",\r
          optionsGet: () =>\r
            Promise.resolve([\r
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
            ]),\r
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
        },\r
      ],\r
    };\r
    this.data = {\r
      name: "\u8F9B\u5F03\u75BE",\r
      sentence: "\u9189\u91CC\u6311\u706F\u770B\u5251\uFF0C\u68A6\u56DE\u5439\u89D2\u8FDE\u8425",\r
      occupation: "\u8D77\u4E49\u519B",\r
      remark: "\u6740\u8D3C\uFF01\u6740\u8D3C\uFF01\u6740\u8D3C",\r
      status: 2,\r
      image: [\r
        "https://img0.baidu.com/it/u=1514002029,2035215441&fm=26&fmt=auto&gp=0.jpg",\r
        "https://img2.baidu.com/it/u=2116882029,1761299726&fm=26&fmt=auto&gp=0.jpg",\r
      ],\r
    };\r
  },\r
  methods: {},\r
  render() {\r
    return <ml-info data={this.data} props={this.config}></ml-info>;\r
  },\r
});\r
`;export{r as default};
