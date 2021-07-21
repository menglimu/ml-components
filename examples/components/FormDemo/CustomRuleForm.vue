<script>
export default {
  name: 'CustomRuleForm',
  data() {
    return {
      form: {
        name: '',
        pass: '',
        checkPass: ''
      },
      formConfig: {
        size: 'small',
        uiType: 'border',
        labelWidth: '80px',
        inline: true,
        itemMaxWidth: '520px',
        itemBoxWidth: '100%',
        itemWidth: '100%',
        columns: [
          {
            type: 'input',
            label: '姓名',
            prop: 'name',
            required: true,
            rules: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              {
                min: 3,
                max: 5,
                message: '长度在 3 到 5 个字符',
                trigger: 'blur'
              }
            ]
          },
          {
            type: 'input',
            label: '密码',
            prop: 'pass',
            required: true,
            rules: [
              {
                validator: (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请输入密码'));
                  } else {
                    if (this.form.checkPass !== '') {
                      this.$refs.mlForm.validateField('checkPass');
                    }
                    callback();
                  }
                },
                trigger: 'blur'
              }
            ]
          },
          {
            type: 'input',
            label: '确认密码',
            prop: 'checkPass',
            required: true,
            rules: [
              {
                validator: (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请再次输入密码'));
                  } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                  } else {
                    callback();
                  }
                },
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // do something
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<template>
  <div class="demo-container">
    <ml-form ref="mlForm" v-model="form" :config="formConfig"></ml-form>

    <div>
      <c-button type="primary" size="small" @click="submitForm('mlForm')">提交</c-button>
      <c-button size="small" @click="resetForm('mlForm')">重置</c-button>
    </div>
  </div>
</template>
