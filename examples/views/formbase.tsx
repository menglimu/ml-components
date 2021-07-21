import Vue from "vue";
import CustomCascader from "@/components/CustomCascader";
import FormBase from "./../components/FormDemo/FormBase";
import FormRule from "./../components/FormDemo/FormRule";

export const title = "快速上手"; // 左侧自动导入时，菜单的名称
export const sort = 200; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      sourceFormBase: "",
      sourceFormRule: "",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        date1: [{ type: "date", required: true, message: "请选择日期", trigger: "change" }],
        date2: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
        type: [{ type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }],
        resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  created() {
    import(`./../components/FormDemo/FormBase.tsx?raw`).then(res => {
      this.sourceFormBase = res.default;
    });
    import(`./../components/FormDemo/FormRule.tsx?raw`).then(res => {
      this.sourceFormRule = res.default;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate();
    },
  },
  render() {
    return (
      <div>
        <h3>表单基础使用</h3>
        <p>基础的表单，包含异步数据源，校验等</p>
        <CustomCascader v-model={this.value} options={[]} />
        <base-source-view source={this.sourceFormBase}>
          <FormBase />
        </base-source-view>
        <base-source-view source={this.sourceFormRule}>
          <FormRule />
        </base-source-view>
        <el-form
          props={{ model: this.ruleForm }}
          rules={this.rules}
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input v-model={this.ruleForm.name}></el-input>
          </el-form-item>
        </el-form>
        <el-button onClick={this.onSubmit}>提交</el-button>
      </div>
    );
  },
});
