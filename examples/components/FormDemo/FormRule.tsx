/**
 * 表单验证
 */
import Vue from "vue";
import { MlForm, MlFormConfig } from "types/form";

export default Vue.extend({
  name: "FormRule",
  props: {
    name: {
      type: Number,
    },
  },
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: {},
    };
  },
  created() {
    this.formConfig = {
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      columns: [
        {
          type: "input",
          label: "姓名",
          prop: "name",
        },
        {
          type: "select",
          label: "性别",
          prop: "type",
          required: true,
          options: [
            { value: 1, label: "男" },
            { value: 0, label: "女" },
          ],
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
        <el-button onClick={this.onSubmit}>提交</el-button>
      </div>
    );
  },
});
