import Vue from "vue";

import Base from "../components/TableDemo/Base";
import Search from "../components/TableDemo/Search";
import Btn from "../components/TableDemo/Btn";
import Config from "../components/TableDemo/Config";
import Columns from "../components/TableDemo/Columns";
import Slot from "../components/TableDemo/Slot";

export const title = "MlTable基础表格"; // 左侧自动导入时，菜单的名称
export const sort = 300; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      sourceBase: "",
      sourceSearch: "",
      sourceBtn: "",
      sourceConfig: "",
      sourceColumns: "",
      sourceSlot: "",
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
    import(`./../components/TableDemo/Config.tsx?raw`).then((res) => {
      this.sourceConfig = res.default;
    });
    import(`./../components/TableDemo/Columns.tsx?raw`).then((res) => {
      this.sourceColumns = res.default;
    });
    import(`./../components/TableDemo/Slot.tsx?raw`).then((res) => {
      this.sourceSlot = res.default;
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

        <h5>表格配置</h5>
        <p>
          <div>通过config，对表格进行详细配置</div>
          <ul>
            <li>
              <label>selection</label> 表格前的多选框， 默认 false
            </li>
            <li>
              <label>index</label> 前端自动序号， 默认 false
            </li>
            <li>
              <label>reserveSelection</label> 多选时候，分页，保存选择状态， 默认 true
            </li>
            <li>
              <label>tableKey</label> 表格的主键， 默认 id
            </li>
            <li>
              <label>tableOptWidth</label> 表格操作宽度,不传为自适应
            </li>
            <li>
              <label>initSearch</label> 是否初始化后，立即请求接口，默认
              true。在表格请求时，需要先请求其他的返回结果作为查询条件时
            </li>
            <li>
              <label>api</label> 表格请求的后台接口
              <br />
              api.list：请求数据的接口，返回的对象包含total和data。该参数的入参为当前表格的查询条件，可以在此处进行一些值的转换，如时间段数组转为2个字段
              <br />
              api.delete：删除接口，evtType为mldelete时触发内部删除并使用该方法
            </li>
            <li>
              <label>nodeData</label> VNodeData表格的nodeData传值，内容可参考vue官网
            </li>
            <li>
              <label>...</label> 其他element table的prop项，参考
              <a href="https://element.eleme.cn/#/zh-CN/component/table#table-attributes" target="_blank">
                Table Attributes
              </a>
            </li>
            <li>
              <label>columns</label> 表格的列，具体看下面介绍
            </li>
          </ul>
        </p>
        <base-source-view source={this.sourceConfig}>
          <Config />
        </base-source-view>

        <h5>表格columns</h5>
        <p>
          <div>通过 config.columns 对表格的每一列进行控制</div>
          <ul>
            <li>
              <label>label</label> 表格项的label名
            </li>
            <li>
              <label>prop</label> 表格项的数据key名
            </li>
            <li>
              <label>type</label> 表格中的数据类型 默认string，其他包含 "image" | "svg" | "select"
              <br />
              "image"：图片。可配置额外参数: noPre (不进行预览，默认false)。 baseUrl (图片地址的前缀,会拼接在地址前)
              <br />
              "svg"：svg图标。需要全局注册svg-icon组件
              <br />
              "select"：选择类的数据回显(包含树形的)。可额外配置
              options、optionsGet、optionLabel、optionValue、optionChildren用法同form
            </li>
            <li>
              <label>key</label> 供vue使用，默认同prop的值，当同时存在2个的时候，可设置不同的prop来处理key相同的情况
            </li>
            <li>
              <label>hide</label> 是否隐藏列，默认 false
            </li>

            <li>
              <label>statusJudge</label> 状态处理。对象内分别为状态名和满足的条件 success:
              绿色，error：红色，warning：橙色，done：蓝色，failed：灰色
              <br /> 传入judge对象或方法，传入方法时需要返回对应的string 可自定义返回不同的，然后写全局样式
            </li>
            <li>
              <label>render</label> 自定义表格内容的展示
            </li>
            <li>
              <label>renderColumn</label> 自定义整列内容，应返回 el-table-column
            </li>
            <li>
              <label>...</label> 其他element tableItem的prop项，参考
              <a href="https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes" target="_blank">
                Table-column Attributes
              </a>
            </li>
          </ul>
        </p>
        <base-source-view source={this.sourceColumns}>
          <Columns />
        </base-source-view>

        <h5>表格slot/scopedSlots</h5>
        <p>
          <ul>
            <li>
              <label>slot.default</label> 默认的slot 位于搜索框和表格之间
            </li>
            <li>
              <label>slot.empty</label> 表格为空的时候的展示内容
            </li>
            <li>
              <label>scopedSlots.search</label> 自定义搜索头， 入参为一个对象，{"{search, reset}"}
              search为表格搜索方法，reset为重置方法。2个方法都会重置分页条件
            </li>
            <li>
              <label>scopedSlots.table</label> 自定义表格内容， 入参为一个对象，{"{data, columns}"}
              data为当前页的数据，columns为处理后的内容列
            </li>
          </ul>
        </p>
        <base-source-view source={this.sourceSlot}>
          <Slot />
        </base-source-view>
      </div>
    );
  },
});
