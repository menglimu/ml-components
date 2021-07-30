/**
 * 项目说明
 */
import Vue from "vue";
export const title = "项目简介"; // 左侧自动导入时，菜单的名称
export const sort = 100; // 菜单的排序
export default Vue.extend({
  name: "Index",
  data() {
    return {};
  },
  methods: {},
  render() {
    return (
      <div>
        <h3>项目简介</h3>
        基于element，对form和table进行二次封装。进行统一的调用。use时，
        <br />
        注入组件： MlForm(表单)、 MlTable(表格)、 MlInfo(回显)
        <br />
        注入指令：globalTooltip(全局tooltip), clickPreventRe(点击防抖), clickOutside(点击元素外),
        clickSubmit(点击调用加载中),
        <p>其他组件需要时，自行引入</p>
      </div>
    );
  },
});
