import Vue from "vue";

import Base from "./../components/TableDemo/Base";
import Search from "./../components/TableDemo/Search";

export const title = "表格快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 300; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      sourceBase: "",
      sourceSearch: "",
    };
  },
  created() {
    import(`./../components/TableDemo/Base.tsx?raw`).then((res) => {
      this.sourceBase = res.default;
    });
    import(`./../components/TableDemo/Search.tsx?raw`).then((res) => {
      this.sourceSearch = res.default;
    });
  },
  methods: {},
  render() {
    return (
      <div class="page">
        <h3>表格基础使用</h3>

        <h5>表格基础整理</h5>
        <p>文本显示，select，tree的值的回显自动转换，带状态圆点的显示项，自定义显示，搜索表头，内部按钮，外部按钮</p>
        <base-source-view source={this.sourceBase}>
          <Base />
        </base-source-view>

        <h5>表格搜索头</h5>
        <p>
          <div>设置表格搜索的初始值，使用searchData</div>
          <div>表格搜索头 searchConfig 中包含以下属性</div>
          <ul>
            <li>
              <label>isBtnInForm</label> 搜索和重置按钮在输入项后显示，！输入项不能占满元素 默认
            </li>
            <li>
              <label>isOverHide</label> 超过一行隐藏。不传会根据config中的column的长度判断，长度大于3的时候开启
            </li>
            <li>
              <label>config</label> 搜索表单配置，详情参考mlform表单配置
            </li>
            <li>
              <label>initialValue</label> 搜索表单的初始值，该值重置会被清空
            </li>
          </ul>
        </p>
        <base-source-view source={this.sourceSearch}>
          <Search />
        </base-source-view>
      </div>
    );
  },
});
