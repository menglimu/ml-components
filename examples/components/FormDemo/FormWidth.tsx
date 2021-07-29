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
      labelWidth: "100px",
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
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name1" },
        { label: "姓名", labelWidth: "120px", placeholder: "姓名姓名姓名", prop: "name2" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name3" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name4" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name5" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name6" },
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name7" },
        { label: "姓名", block: true, placeholder: "姓名姓名姓名", prop: "name8" },
        { label: "姓名", itemMaxWidth: "230px", placeholder: "姓名姓名姓名", prop: "name9" },
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
