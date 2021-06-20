import Vue from 'vue'
import CustomCascader from '@/components/CustomCascader'
import MlForm from '@/packages/MlForm'
import { MlFormConfig } from 'types/form'

export default Vue.extend({
  data() {
    let formConfig: MlFormConfig
    return {
      value: null,
      formConfig,
      formValue: {}
    }
  },
  created() {
    this.formConfig = {
      columns: [{ label: '名字', prop: 'name' }]
    }
  },
  render() {
    return (
      <div>
        <CustomCascader v-model={this.value} options={[]} />
        <MlForm config={this.formConfig} v-model={this.formValue}></MlForm>
      </div>
    )
  }
})
