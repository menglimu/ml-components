import Vue from "vue";

import Base from "../components/InfoDemo/Base";
import Props from "../components/InfoDemo/Props";

export const title = "MlInfo信息回显"; // 左侧自动导入时，菜单的名称
export const sort = 400; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      sourceBase: "",
      sourceProps: "",
    };
  },
  created() {
    import(`./../components/InfoDemo/Base.tsx?raw`).then((res) => {
      this.sourceBase = res.default;
    });
    import(`./../components/InfoDemo/Props.tsx?raw`).then((res) => {
      this.sourceProps = res.default;
    });
  },
  methods: {},
  render() {
    return (
      <div class="page">
        <h3>数据回显基本使用</h3>
        <div> 回显组件，数据可通过data传入或进行request传入接口自动请求</div>
        <p>
          prop参数配置项
          <ul>
            <li>
              <label>title</label> 整体标题
            </li>
            <li>
              <label>width</label> 数据项的总宽度
            </li>
            <li>
              <label>labelWidth</label> label的长度
            </li>
            <li>
              <label>labelSuffix</label> label后缀符号
            </li>
            <li>
              <label>columns</label> 每一项的配置，具体参考下表
            </li>
            <li>
              <label>request</label> 详情请求接口，和data二选一即可
            </li>
            <li>
              <label>data</label> 详情数据
            </li>
          </ul>
        </p>
        <p>
          columns的常用配置
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
              <label>rows</label> 数据的行数，默认一行。设置为0的时候，表示不限制行数
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
        <h5>基础使用</h5>
        <base-source-view source={this.sourceBase}>
          <Base />
        </base-source-view>
        <h5>props一些配置demo</h5>
        <base-source-view source={this.sourceProps}>
          <Props />
        </base-source-view>
      </div>
    );
  },
});
