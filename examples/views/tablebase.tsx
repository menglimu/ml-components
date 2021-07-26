import Vue from "vue";

import Base from "./../components/TableDemo/Base";

export const title = "表格快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 300; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      sourceBase: "",
    };
  },
  created() {
    import(`./../components/TableDemo/Base.tsx?raw`).then((res) => {
      this.sourceBase = res.default;
    });
  },
  methods: {},
  render() {
    return (
      <div>
        <h3>表格基础使用</h3>

        <h5>表格基础整理</h5>
        <p>文本显示，select，tree的值的回显自动转换，带状态圆点的显示项，自定义显示，搜索表头，内部按钮，外部按钮</p>

        <base-source-view source={this.sourceBase}>
          <Base />
        </base-source-view>
      </div>
    );
  },
});
