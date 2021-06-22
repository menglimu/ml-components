import Vue from 'vue';
import CustomCascader from '@/components/CustomCascader';
import FormBase from './../components/FormDemo/FormBase';

export const title = '快速上手'; // 左侧自动导入时，菜单的名称
export const sort = 2000; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      sourceFormBase: ''
    };
  },
  created() {
    import(`./../components/FormDemo/FormBase.tsx?raw`).then(res => {
      this.sourceFormBase = res.default;
    });
  },
  render() {
    return (
      <div>
        <CustomCascader v-model={this.value} options={[]} />
        <base-source-view source={this.sourceFormBase}>
          <FormBase />
        </base-source-view>
      </div>
    );
  }
});
