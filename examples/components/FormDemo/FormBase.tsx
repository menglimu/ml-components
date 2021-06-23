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
      columns: [
        {
          type: 'input',
          label: '姓名',
          prop: 'name'
        },
        {
          type: 'select',
          label: '性别',
          prop: 'type',
          options: [
            { value: 1, label: '男' },
            { value: 0, label: '女' }
          ]
        }
      ]
    };
  },
  methods: {},
  render() {
    return <ml-form config={this.formConfig} v-model={this.formValue}></ml-form>;
  }
});
