/**
 * 回显组件使用示例
 */
import Vue from "vue";
import style from "index.module.scss";
import { MlInfoProps } from "types/info";

let data = {
  name: "辛弃疾",
  sentence: "醉里挑灯看剑，梦回吹角连营",
  occupation: "起义军",
  remark: "杀贼！杀贼！杀贼",
  status: 2,
  image: [
    "https://img0.baidu.com/it/u=1514002029,2035215441&fm=26&fmt=auto&gp=0.jpg",
    "https://img2.baidu.com/it/u=2116882029,1761299726&fm=26&fmt=auto&gp=0.jpg",
  ],
  rows: "杀贼！杀贼！杀贼！".repeat(40),
};

export default Vue.extend({
  name: "Base",
  data() {
    return {
      config: null as MlInfoProps,
    };
  },
  created() {
    this.config = {
      request: () => {
        // const data = new Array(10).fill(tableData)
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(data);
          }, 5000);
        });
      },
      columns: [
        { label: "姓名", prop: "name" },
        { label: "名句", prop: "sentence" },
        { label: "职业", prop: "occupation" },
        { label: "备注", prop: "remark" },
        {
          width: "100%",
          render: () => <div style={{ background: "#e7e7e7", height: "1px", width: "100%", margin: "10px 0" }}></div>,
        },

        {
          label: "标题",
          prop: "render",
          // sortable: true,
          render: (h) => {
            return <span style={`color: #1EA1FF; text-decoration: underline;cursor: pointer;`}> - 自定义render</span>;
          },
        },

        {
          type: "select",
          label: "状态",
          prop: "status",
          optionsGet: () =>
            Promise.resolve([
              {
                value: 1,
                label: "骠骑将军",
                children: [{ value: 2, label: "文武双全" }],
              },
              {
                value: 3,
                label: "美食家",
              },
              {
                value: 4,
                label: "深度游戏玩家",
              },
              {
                value: 5,
                label: "种田的",
              },
            ]),
        },
        {
          type: "svg",
          label: "svg矢量图",
          prop: "svg",
        },
        {
          type: "image",
          label: "图片",
          prop: "image",
          width: "100%",
        },
        {
          label: "超长文字",
          prop: "rows",
          rows: 4,
          width: "100%",
        },
      ],
    };
  },
  methods: {},
  render() {
    return <ml-info props={this.config}></ml-info>;
  },
});
