import Vue from 'vue';
import CustomCascader from '@/components/CustomCascader';
import { MlFormConfig } from 'types/form';

export const title = '快速上手'; // 左侧自动导入时，菜单的名称
export const sort = 2000; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      formConfig: null as MlFormConfig,
      formValue: {}
    };
  },
  created() {
    this.formConfig = {
      columns: [{ label: '名字', prop: 'name' }]
    };
  },
  render() {
    return (
      <div>
        <CustomCascader v-model={this.value} options={[]} />
        <ml-form config={this.formConfig} v-model={this.formValue}></ml-form>
      </div>
    );
  }
});
