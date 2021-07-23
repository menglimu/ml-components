/**
 * 表单自定义组件
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
      inline: false,
      columns: [
        {
          type: "",
          prop: "list1",
          label: "细化指标1234",
          required: true,
          // eslint-disable-next-line
          render: () => {
            // 自定义组件。会自动绑定value和input事件。上面的细化指标demo。可通过自定义组件来实现。
            // disabled={true}
            // console.log(this, 12);
            return <el-input onInput={() => console.log(123567)} />;
          },
        },
        {
          render: () => (
            <div style={{ height: "1px", background: "#e6e6e6", width: "100%", marginBottom: "20px" }}></div>
          ),
        },
        {
          label: "长度",
          prop: "length",
          render(h, value, onInput) {
            return (
              <div>
                <el-button
                  onClick={() => {
                    const val = value ? [...value] : [];
                    val.push(val.length + 1);
                    onInput(val);
                  }}
                >
                  新增
                </el-button>
                <ul>
                  {value?.map((item: any) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            );
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
        {JSON.stringify(this.formValue)}
      </div>
    );
  },
});
