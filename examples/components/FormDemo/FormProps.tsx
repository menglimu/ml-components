/**
 * 表单参数传入
 */
import Vue from "vue";
import { MlForm, MlFormConfig } from "types/form";

export default Vue.extend({
  name: "FormProps",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: null,
    };
  },
  created() {
    this.formConfig = {
      columns: [
        {
          type: "select",
          label: "长度",
          prop: "length",
          options: [
            { label: "杜甫", value: 1 },
            { label: "李白", value: 2 },
            { label: "辛弃疾", value: 12 },
          ],
          nodeData: {
            props: { placeholder: "请选择123" },
            attrs: { style: "width: 600px;" },
          },
          props: {
            multiple: true,
          },
          attrs: {
            class: "select1235",
          },
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      let form = this.$refs.form as MlForm;
      form.validate();
    },
  },
  render() {
    return (
      <div>
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>
      </div>
    );
  },
});
