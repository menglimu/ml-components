/**
 * 表单基础
 */
import Vue from "vue";
import { MlForm, MlFormConfig } from "types/form";
import CustomCascader from "@/components/CustomCascader";

function optionsGet() {
  return Promise.resolve([
    { value: 1, label: "男" },
    { value: 0, label: "女" },
  ]);
}

export default Vue.extend({
  name: "FormBase",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: null,
    };
  },
  created() {
    this.formConfig = {
      labelPosition: "top",
      columns: [
        { label: "姓名", placeholder: "姓名姓名姓名", prop: "name" },
        {
          type: "select",
          label: "性别",
          prop: "type",
          required: true,
          value: 0,
          options: [
            { value: 1, label: "男" },
            { value: 0, label: "女" },
          ],
        },
        { label: "性别", prop: "sex", type: "select", optionsGet },
        {
          label: "自定义",
          prop: "render",
          type: "select",
          required: true,
          block: true,
          optionsGet,
          render: () => <CustomCascader options={[{ label: "北京", value: 1 }]} />,
        },
        { label: "备注", prop: "marks", type: "textarea", block: true },
      ],
    };
  },
  methods: {
    async onSubmit() {
      await (this.$refs.form as MlForm).validate();
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$message.success("提交成功");
          resolve(1);
        }, 5000);
      });
    },
    onReset() {
      (this.$refs.form as MlForm).reset();
    },
  },
  render() {
    return (
      <div>
        <ml-form ref="form" config={this.formConfig} v-model={this.formValue}></ml-form>
        <div>
          <el-button type="primary" v-submitClick={this.onSubmit}>
            提交
          </el-button>
          <el-button onClick={this.onReset}>重置</el-button>
        </div>
        <p>当前表单输出值：{JSON.stringify(this.formValue)}</p>
      </div>
    );
  },
});
