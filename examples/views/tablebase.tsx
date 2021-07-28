import Vue from "vue";

import Base from "./../components/TableDemo/Base";
import Search from "./../components/TableDemo/Search";
import Btn from "./../components/TableDemo/Btn";

export const title = "表格快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 300; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      sourceBase: "",
      sourceSearch: "",
      sourceBtn: "",
    };
  },
  created() {
    import(`./../components/TableDemo/Base.tsx?raw`).then((res) => {
      this.sourceBase = res.default;
    });
    import(`./../components/TableDemo/Search.tsx?raw`).then((res) => {
      this.sourceSearch = res.default;
    });
    import(`./../components/TableDemo/Btn.tsx?raw`).then((res) => {
      this.sourceBtn = res.default;
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

        <h5>表格按钮</h5>
        <p>
          <div>通过innerBtn、outerBtn可分别设置表格的内外部按钮</div>
          <ul>
            <li>
              <label>name</label> 按钮名字，显示在按钮上的内容
            </li>
            <li>
              <label>Elicon、icon</label> 按钮的图标，Elicon为element的图标名。icon为自定义svg。需要全局注册 svg-icon
              组件
            </li>
            <li>
              <label>evtType、callback</label>
              evtType点击按钮的时候触发的类型。callback点击事件的执行函数。二者任选其一即可，行内按钮参数为一个数据对象。表格外按钮参数为数据对象数组。
              <br />
              evtType为mldelete会触发内部的删除逻辑。确认删除，然后删除
            </li>
            <li>
              <label>showJudge</label>
              按钮是否显示控制，多用作权限控制，根据状态显示不同按钮。行内按钮和表格外按钮差别较大。
              <br />
              行内按钮：可以传一个对象，进行judge判断，当当前行数据全和judge条件全符合时候，按钮显示。 <br />
              行内和表格外按钮。可传入一个方法进行返回Boolean值进行判断。行内时，函数入参为当前行。表格外按钮，参数为当前data
            </li>
            <li>
              <label>selection</label> 外部按钮独有，用于根据选择的数量控制按钮是否disable， "none" | "single" |
              "multiple" | "" 不选,(其他值)， 单选，多选
            </li>
          </ul>
        </p>
        <base-source-view source={this.sourceBtn}>
          <Btn />
        </base-source-view>
      </div>
    );
  },
});
