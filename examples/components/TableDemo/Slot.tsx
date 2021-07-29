/**
 * 表格slot
 */
import Vue from "vue";
import { MlTable, MlTableProps } from "types/table";

let data = {
  content: [
    // { name: "辛弃疾", sentence: "醉里挑灯看剑，梦回吹角连营", occupation: "起义军", remark: "杀贼！杀贼！杀贼" },
    // { name: "苏东坡", sentence: "一蓑烟雨任平生", occupation: "老饕", remark: "问汝平生功业" },
    // { name: "李清照", sentence: "至今思项羽，不肯过江东", occupation: "怼怼", remark: "易安大人" },
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
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(data);
              }, 2000);
            });
          },
        },
        columns: [
          { label: "姓名", prop: "name" },
          { label: "名句", prop: "sentence" },
          { label: "职业", prop: "occupation" },
          { label: "备注", prop: "remark" },
        ],
      },
      searchConfig: {
        config: {
          columns: [{ label: "姓名", prop: "name" }],
        },
      },
    };
  },
  mounted() {},
  methods: {},
  render() {
    return (
      <div>
        <ml-table
          ref="mainTable"
          props={this.tableConfig}
          scopedSlots={{
            search: ({ search, reset }) => (
              <div>
                这是搜索框自定义 <el-button onClick={search}>搜索</el-button>{" "}
                <el-button onClick={reset}>重置</el-button>
              </div>
            ),
          }}
        >
          <div>表格和搜索框之间的默认slot</div>
          <div slot="empty">没得数据的slot</div>
        </ml-table>
        <br></br>
        <br></br>
        <br>表单内容自定义</br>
        <ml-table
          props={this.tableConfig}
          scopedSlots={{
            table: ({ data, columns }) => (
              <div>
                {columns.map((item) => (
                  <span>{item.label}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                ))}
              </div>
            ),
          }}
        ></ml-table>
      </div>
    );
  },
});
