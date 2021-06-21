import Vue from 'vue';
import CustomCascader from '@/components/CustomCascader';
import { MlFormConfig } from 'types/form';

export default Vue.extend({
  data() {
    let formConfig: MlFormConfig;
    return {
      value: null,
      formConfig,
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
