<template>
  <div class="demo-container">
    <ml-form ref="mlForm" :config="formConfig" v-model="form"></ml-form>

    <div>
      <c-button type="primary" @click="submitForm('mlForm')" size="small">提交</c-button>
      <c-button @click="resetForm('mlForm')" size="small">重置</c-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RuleForm",
  data() {
    return {
      form: {
        name: "",
        ename: "",
        type: null,
        remarks: "",
        skills: [],
        switch: true,
      },
      formConfig: {
        size: "small",
        uiType: "border",
        labelWidth: "80px",
        inline: true,
        itemMaxWidth: "520px",
        itemBoxWidth: "100%",
        itemWidth: "100%",
        rules: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          ],
        },
        columns: [
          {
            type: "input",
            label: "姓名",
            prop: "name",
            required: true,
          },
          {
            type: "string",
            label: "英文名",
            prop: "ename",
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
            type: "radio",
            label: "性别",
            prop: "type",
            required: true,
            options: [
              { value: 1, label: "男" },
              { value: 0, label: "女" },
            ],
          },
          {
            type: "checkbox",
            label: "技能",
            prop: "skills",
            value: [],
            required: true,
            options: [
              { value: 1, label: "Java" },
              { value: 0, label: "JavaScript" },
            ],
          },
          {
            type: "switch",
            label: "即时配送",
            prop: "switch",
          },
          {
            type: "textarea",
            label: "备注",
            prop: "remarks",
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
  },
};
</script>
