import Vue from "vue";
import CustomCascader from "@/components/CustomCascader";
import FormBase from "./../components/FormDemo/FormBase";
import FormRule from "./../components/FormDemo/FormRule";

export const title = "快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 200; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      sourceFormBase: "",
      sourceFormRule: "",
    };
  },
  created() {
    import(`./../components/FormDemo/FormBase.tsx?raw`).then((res) => {
      this.sourceFormBase = res.default;
    });
    import(`./../components/FormDemo/FormRule.tsx?raw`).then((res) => {
      this.sourceFormRule = res.default;
    });
  },
  methods: {},
  render() {
    return (
      <div>
        <h3>表单基础使用</h3>
        <p>基础的表单，包含异步数据源，校验等</p>
        {/* <CustomCascader v-model={this.value} options={[]} /> */}
        <base-source-view source={this.sourceFormBase}>
          <FormBase />
        </base-source-view>
        <p>表单校验</p>
        <base-source-view source={this.sourceFormRule}>
          <FormRule />
        </base-source-view>
      </div>
    );
  },
});
