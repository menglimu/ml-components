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
        基于element，对form和table进行二次封装。进行统一的
      </div>
    );
  },
});
