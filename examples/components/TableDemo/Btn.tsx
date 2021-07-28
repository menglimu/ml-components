/**
 * 表格按钮
 */
import Vue from "vue";
import { MlTableProps } from "types/table";

let data = {
  content: [
    { name: "辛弃疾", sentence: "醉里挑灯看剑，梦回吹角连营", occupation: "起义军", remark: "杀贼！杀贼！杀贼" },
    { name: "苏东坡", sentence: "一蓑烟雨任平生", occupation: "老饕", remark: "问汝平生功业" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
  ],
  total: 1,
};

export default Vue.extend({
  name: "TableSearch",
  data() {
    return {
      tableConfig: null as MlTableProps,
      user: "管理员",
    };
  },
  created() {
    this.tableConfig = {
      innerBtn: [
        { name: "修改", showJudge: (row) => row.name !== "李清照" },
        { name: "打榜", type: "text", showJudge: { name: "李清照" } },
      ],
      outerBtn: [
        { name: "单选可用", selection: "single", showJudge: () => this.user === "管理员" },
        { name: "新增evt", type: "primary", Elicon: "", evtType: "add" },
        { name: "新增callback", icon: "", callback: this.onAdd },
        { render: () => <el-button>自定义按钮</el-button> },
      ],
      searchConfig: {
        config: {
          columns: [
            { label: "姓名", prop: "name" },
            { label: "名句", prop: "sentence" },
            { label: "职业", prop: "occupation" },
            { label: "备注", prop: "remark" },
          ],
        },
      },
      config: {
        api: {
          list: (params) => {
            console.log(params);
            return Promise.resolve(data);
          },
        },
        columns: [
          { label: "姓名", prop: "name" },
          { label: "名句", prop: "sentence" },
          { label: "职业", prop: "occupation" },
          { label: "备注", prop: "remark" },
        ],
      },
    };
  },
  methods: {
    onAdd() {
      this.$message("callback 点击回调");
    },
    onAddEvt() {
      this.$message("evt 点击回调");
    },
  },
  render() {
    return <ml-table props={this.tableConfig} onAdd={this.onAddEvt}></ml-table>;
  },
});
