/**
 * 表格搜索项
 */
import Vue from "vue";
import { MlTableProps } from "types/table";

let data = {
  content: [
    { name: "辛弃疾", sentence: "醉里挑灯看剑，梦回吹角连营", occupation: "起义军", remark: "杀贼！杀贼！杀贼" },
    { name: "苏东坡", sentence: "一蓑烟雨任平生", occupation: "老饕", remark: "问汝平生功业" },
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
      searchData: { name: 123, date: "2020 20-20-20" },
      searchConfig: {
        // isBtnInForm: true,
        // isOverHide: false,
        // aloneLineBtn: false,
        initialValue: { name: "霍去病" },
        config: {
          itemBoxWidth: "33.33%",
          columns: [
            { label: "姓名", prop: "name" },
            { label: "名句", prop: "sentence", value: "竹杖芒鞋轻胜马" },
            { label: "职业", prop: "occupation", itemBoxWidth: "50%" },
            { label: "备注", prop: "remark" },
            { label: "备注1", prop: "remark1", itemBoxWidth: "auto" },
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
  methods: {},
  render() {
    return <ml-table props={this.tableConfig}></ml-table>;
  },
});
