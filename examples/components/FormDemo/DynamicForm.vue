<template>
  <div class="demo-container">
    <ml-form ref="mlForm" :config="formConfig" v-model="form"></ml-form>

    <div>
      <c-button type="primary" @click="submitForm('mlForm')" size="small">提交</c-button>
      <c-button @click="addDomain" size="small">新增域名</c-button>
      <c-button @click="resetForm('mlForm')" size="small">重置</c-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicForm",
  data() {
    return {
      domains: [],
      form: {
        switch: true,
        email: "",
      },
      formConfig: {
        size: "small",
        uiType: "border",
        labelWidth: "100px",
        inline: true,
        itemMaxWidth: "520px",
        itemBoxWidth: "100%",
        itemWidth: "100%",
        columns: [
          {
            type: "switch",
            label: "显示隐藏邮箱",
            prop: "switch",
            value: true,
          },
          {
            type: "input",
            label: "邮箱",
            prop: "email",
            required: true,
            show: value => {
              return value.switch;
            },
            rules: [
              { required: true, message: "请输入邮箱地址", trigger: "blur" },
              {
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: ["blur", "change"],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // do something
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addDomain() {
      this.domains.push(1);
      const length = this.domains.length;
      const label = "域名" + length;
      const prop = "domain" + length;
      this.form[prop] = "";
      this.formConfig.columns.push({
        type: "input",
        label,
        prop,
        required: true,
        rules: [
          {
            required: true,
            message: "域名不能为空",
            trigger: "blur",
          },
        ],
      });
    },
  },
};
</script>
