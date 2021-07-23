import Vue from "vue";
import FormBase from "./../components/FormDemo/FormBase";
import FormRule from "./../components/FormDemo/FormRule";
import FormWidth from "./../components/FormDemo/FormWidth";

export const title = "表单快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 200; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      sourceFormBase: "",
      sourceFormRule: "",
      sourceFormWidth: "",
    };
  },
  created() {
    import(`./../components/FormDemo/FormBase.tsx?raw`).then((res) => {
      this.sourceFormBase = res.default;
    });
    import(`./../components/FormDemo/FormRule.tsx?raw`).then((res) => {
      this.sourceFormRule = res.default;
    });
    import(`./../components/FormDemo/FormWidth.tsx?raw`).then((res) => {
      this.sourceFormWidth = res.default;
    });
  },
  methods: {},
  render() {
    return (
      <div>
        <h3>表单基础使用</h3>

        <h5>表单基础整理</h5>
        <p>基础的表单，包含异步数据源，校验等</p>

        <base-source-view source={this.sourceFormBase}>
          <FormBase />
        </base-source-view>

        <h5>表单校验</h5>
        <p>
          <div>required: 是否必填</div>
          <div>reg: 正则表单式</div>
          <div>error: 输入错误的提示</div>
          <div>minlength: 最小的输入长度</div>
          <div>maxlength: 最大的输入长度</div>
          <div>rules: 自定义rule的一些数组配置。具体可以参考element官网 或 MlFormRule 接口</div>
          <div>
            rules: 表单整体的校验，参考
            <a href="https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng" target="_blank">
              element form
            </a>
          </div>
        </p>
        <base-source-view source={this.sourceFormRule}>
          <FormRule />
        </base-source-view>

        <h5>表单长度控制</h5>
        <p>
          <div>labelWidth: label的宽度，可在form中全部配置</div>
          <div>itemBoxWidth: 单项输入框box的长度，可在form中全部配置。block的时候，长度不受form的控制，默认100%</div>
          <div>itemWidth: 输入项内容的长度,label也包含在其中，可在form中全部配置</div>
        </p>
        <base-source-view source={this.sourceFormWidth}>
          <FormWidth />
        </base-source-view>
      </div>
    );
  },
});
