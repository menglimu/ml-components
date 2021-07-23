import Vue from "vue";
import FormBase from "./../components/FormDemo/FormBase";
import FormRule from "./../components/FormDemo/FormRule";
import FormWidth from "./../components/FormDemo/FormWidth";
import FormProps from "./../components/FormDemo/FormProps";
import FormRender from "./../components/FormDemo/FormRender";
import FormSet from "./../components/FormDemo/FormSet";

export const title = "表单快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 200; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      sourceFormBase: "",
      sourceFormRule: "",
      sourceFormWidth: "",
      sourceFormProps: "",
      sourceFormRender: "",
      sourceFormSet: "",
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
    import(`./../components/FormDemo/FormProps.tsx?raw`).then((res) => {
      this.sourceFormProps = res.default;
    });
    import(`./../components/FormDemo/FormRender.tsx?raw`).then((res) => {
      this.sourceFormRender = res.default;
    });
    import(`./../components/FormDemo/FormSet.tsx?raw`).then((res) => {
      this.sourceFormSet = res.default;
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
          <div>block: 是否整行显示</div>
          <div>itemMaxWidth: 是否整行显示</div>
        </p>
        <base-source-view source={this.sourceFormWidth}>
          <FormWidth />
        </base-source-view>

        <h5>表单参数控制控制</h5>
        <p>
          <div>
            nodeData: 同vue官方的
            <a href="https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1">
              nodeData介绍
            </a>
          </div>
          <div> props: nodeData.props的代理</div>
          <div> attrs: nodeData.attrs的代理</div>
        </p>
        <base-source-view source={this.sourceFormProps}>
          <FormProps />
        </base-source-view>

        <h5>表单自定义内容</h5>
        <p>
          <div>在一些复杂情况，现有组件不满足，或需要插入一些东西的时候。可以使用render进行组件的内容</div>
          <div>在存在render, prop 名不存在时。将被当做普通元素处理。如，分割线、按钮这种不需要进行表单输入绑定的</div>
          <div>
            当render存在并返回一个vue组件时，会自动为组件注入value和input事件。需要在组件的prop接受value,并在值修改后触发this.$emit('input','xxx')
            自定义组件会在input事件监听后，触发一个 $emit("el.form.change")
            的form校验。想使用blur校验，可在组件内需要校验的时候触发this.$parent.$emit("el.form.blur")
          </div>
          <div>当render存在并且最外层为原生的HTMLelement时，如需双向绑定。需要自己处理value和input事件</div>
          <div>
            size, disabled, clearable, placeholder, 这几个属性会注入到props和attrs中，可根据需要进行处理。
            labelWidth单独注入props
          </div>
        </p>
        <base-source-view source={this.sourceFormRender}>
          <FormRender />
        </base-source-view>

        <h5>表单整体的通用属性</h5>
        <p>
          <div>uiType: line为下划线，round为圆角, border为边框</div>
          <div>labelPosition: label的对齐方式, 下划线默认左对齐，圆角默认居中</div>
          <div>inline: 是否行内表单</div>
          <div>其他更多请参考d.ts定义和element官方文档</div>
        </p>
        <base-source-view source={this.sourceFormSet}>
          <FormSet />
        </base-source-view>
      </div>
    );
  },
});
