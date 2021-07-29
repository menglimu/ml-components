/**
 * 表格配置
 */
import Vue from "vue";
import { MlTable, MlTableProps } from "types/table";

let data = {
  content: [
    {
      name: "霍去病",
      sentence: "匈奴未灭何以家为",
      occupation: "冠军侯",
      remark: "封狼居胥，饮马翰海",
      status: 1,
      image: "https://img2.baidu.com/it/u=2102736929,2417598652&fm=26&fmt=auto&gp=0.jpg",
    },
    {
      name: "辛弃疾",
      sentence: "醉里挑灯看剑，梦回吹角连营",
      occupation: "起义军",
      remark: "杀贼！杀贼！杀贼",
      status: 2,
      image: [
        "https://img0.baidu.com/it/u=1514002029,2035215441&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=2116882029,1761299726&fm=26&fmt=auto&gp=0.jpg",
      ],
    },
    {
      name: "苏东坡",
      sentence: "一蓑烟雨任平生",
      occupation: "老饕",
      remark: "问汝平生功业",
      status: 3,
      image: ["https://img1.baidu.com/it/u=600451725,8030365&fm=26&fmt=auto&gp=0.jpg"],
    },
    {
      name: "李清照",
      sentence: "至今思项羽，不肯过江东",
      occupation: "怼怼",
      remark: "易安大人",
      status: 4,
      image: "https://img0.baidu.com/it/u=478088386,2867763503&fm=26&fmt=auto&gp=0.jpg",
    },
    {
      name: "陶渊明",
      sentence: "羁鸟恋旧林，池鱼思故渊",
      occupation: "五柳先生",
      remark: "不为五斗米折腰",
      status: 5,
      image: "https://img2.baidu.com/it/u=3084029894,4148570719&fm=26&fmt=auto&gp=0.jpg",
    },
  ],
  total: 1,
};

export default Vue.extend({
  name: "TableSearch",
  data() {
    return {
      tableConfig: null as MlTableProps,
    };
  },
  created() {
    this.tableConfig = {
      innerBtn: [{ name: "打榜", type: "text" }],
      config: {
        api: {
          list: (params) => {
            console.log(params);
            return Promise.resolve(data);
          },
        },
        columns: [
          { label: "姓名", prop: "name" },
          { label: "名句", prop: "sentence", width: "300" },
          { label: "职业", prop: "occupation" },
          { label: "备注", prop: "remark" },

          {
            label: "标题",
            prop: "render",
            key: "newsTitle1", // 重复prop时，需要给其中一个指定一个不同的key
            // sortable: true,
            render: (h, params) => {
              return (
                <div
                  onClick={this.onDetail.bind(this, params.row)}
                  style={`color: #1EA1FF; text-decoration: underline;cursor: pointer;`}
                >
                  {params.row.render} - 自定义render
                </div>
              );
            },
          },

          {
            type: "select",
            label: "状态",
            prop: "status",
            statusJudge: {
              success: { status: 1, name: "霍去病" },
              error: { status: 2 },
              warning: { status: 3 },
              done: { status: 4 },
              failed: { status: 5 },
            },
            options: [
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
            ],
          },
          {
            type: "image",
            label: "图片",
            prop: "image",
          },
          {
            type: "svg",
            label: "svg矢量图",
            prop: "svg",
          },
          {
            label: "自定义列",
            prop: "fileIds",
            renderColumn(h) {
              return (
                <el-table-column
                  label="自定义列"
                  scopedSlots={{
                    default: (scope) => {
                      return <span>可通过scope进行内容的展示</span>;
                    },
                  }}
                ></el-table-column>
              );
            },
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      let mlTable = this.$refs.mainTable as MlTable;
      mlTable.refresh();
    }, 6000);
  },
  methods: {
    onDetail() {
      this.$message("点击");
    },
  },
  render() {
    return <ml-table ref="mainTable" props={this.tableConfig}></ml-table>;
  },
});
