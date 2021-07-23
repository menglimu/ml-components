/**
 * 表单的项的长度的控制
 */
import { MlFormConfig } from "types/form";
import Vue from "vue";

export default Vue.extend({
  name: "FormWidth",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: null,
    };
  },
  created() {
    this.formConfig = {
      labelWidth: "120px",
      itemWidth: "400px",
      // itemMaxWidth: "100%",
      columns: [
        {
          label: "姓名",
          itemBoxWidth: "50%",
          itemWidth: "500px",
          placeholder: "姓名姓名姓名",
          prop: "name",
        },
        { label: "姓名", labelWidth: "80px", placeholder: "姓名姓名姓名", prop: "name" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name" },
        { label: "姓名", block: true, placeholder: "姓名姓名姓名", prop: "name" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name" },
      ],
    };
  },
  methods: {},
  render() {
    return (
      <div>
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>
      </div>
    );
  },
});
