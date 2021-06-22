/**
 * 表格基础
 */
import Vue from 'vue';
import { MlFormConfig } from 'types/form';

export default Vue.extend({
  name: 'FormBase',
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: {}
    };
  },
  created() {
    this.formConfig = {
      columns: [{ label: '名字', prop: 'name' }]
    };
  },
  methods: {},
  render() {
    return <ml-form config={this.formConfig} v-model={this.formValue}></ml-form>;
  }
});
