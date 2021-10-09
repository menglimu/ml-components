/**
 * 表格配置
 */
import Vue from "vue";
import { MlTable, MlTableProps } from "types/table";

let data = {
  content: [
    { name: "辛弃疾", sentence: "醉里挑灯看剑，梦回吹角连营", occupation: "起义军", remark: "杀贼！杀贼！杀贼" },
    { name: "苏东坡", sentence: "一蓑烟雨任平生", occupation: "老饕", remark: "问汝平生功业" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
    { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
  ].map((item, i) => ({ ...item, id: i })),
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
      paginationConfig: false,
      config: {
        selection: true,
        index: true,
        tableOptWidth: "80px",
        height: 300,
        maxHeight: 600,
        initSearch: false,
        // api: {
        //   list: (params) => {
        //     console.log(params);
        //     return Promise.resolve(data);
        //   },
        // },
        columns: [
          { label: "姓名", prop: "name" },
          { label: "名句", prop: "sentence" },
          { label: "职业", prop: "occupation" },
          { label: "备注", prop: "remark" },
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
  methods: {},
  render() {
    return <ml-table ref="mainTable" dataSource={data.content} props={this.tableConfig}></ml-table>;
  },
});
