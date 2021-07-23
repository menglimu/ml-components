/**
 * 表单验证
 */
import Vue from "vue";
import { MlForm, MlFormConfig } from "types/form";

export default Vue.extend({
  name: "FormRule",
  data() {
    return {
      formConfig: null as MlFormConfig,
      formValue: null,
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
          reg: /sdf/,
          error: "请重新输入",
        },
        {
          type: "input",
          label: "长度",
          prop: "length",
          minlength: 12,
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
        {
          type: "input",
          label: "密码",
          prop: "pass",
          required: true,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (value === "") {
                  callback(new Error("请输入密码"));
                } else {
                  if (this.formValue.checkPass !== "") {
                    (this.$refs.form as MlForm).validateField("checkPass");
                  }
                  callback();
                }
              },
              trigger: "blur",
            },
          ],
        },
        {
          type: "input",
          label: "确认密码",
          prop: "checkPass",
          required: true,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (value === "") {
                  callback(new Error("请再次输入密码"));
                } else if (value !== this.formValue.pass) {
                  callback(new Error("两次输入密码不一致!"));
                } else {
                  callback();
                }
              },
              trigger: "blur",
            },
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
