import Vue from "vue";

import Base from "../components/InfoDemo/Base";

export const title = "信息回显"; // 左侧自动导入时，菜单的名称
export const sort = 400; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      sourceBase: "",
    };
  },
  created() {
    import(`./../components/InfoDemo/Base.tsx?raw`).then((res) => {
      this.sourceBase = res.default;
    });
  },
  methods: {},
  render() {
    return (
      <div class="page">
        <h3>表格基础使用</h3>
        <div> 使用了global-tooltip指令，会在文本超出的时候，使用tooltip</div>
        <h5>表单columns基础属性</h5>
        columns的常用配置
        <p>
          <ul>
            <li>
              <label>label</label> label名
            </li>
            <li>
              <label>prop</label> 数据key名
            </li>
            <li>
              <label>width</label> 数据项的总宽度
            </li>
            <li>
              <label>type</label> 数据类型 与表格一致
            </li>
            <li>
              <label>labelWidth</label> label的长度
            </li>
            <li>
              <label>baseUrl、noPre</label> 图片相关 前缀链接 不使用预览 同表格的图片
            </li>
            <li>
              <label>className</label> 数据项的类名
            </li>
            <li>
              <label>formatter</label> 格式处理函数
            </li>
            <li>
              <label>render</label> 自定义显示
            </li>
          </ul>
        </p>
        <base-source-view source={this.sourceBase}>
          <Base />
        </base-source-view>
      </div>
    );
  },
});
