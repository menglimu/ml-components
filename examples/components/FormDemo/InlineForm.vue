<template>
  <div class="demo-container">
    <c-radio-group v-model="isInline" size="small" class="radio-group">
      <c-radio-button :label="true">行内表单</c-radio-button>
      <c-radio-button :label="false">块级表单</c-radio-button>
    </c-radio-group>

    <ml-form :config="formConfig" v-model="form"></ml-form>
  </div>
</template>

<script>
export default {
  name: "InlineForm",
  data() {
    return {
      isInline: true,
      form: {
        name: "",
        ename: "",
        type: "",
      },
      formConfig: {
        inline: true,
        columns: [
          {
            type: "input",
            label: "姓名",
            prop: "name",
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
            options: [
              { value: 1, label: "男" },
              { value: 0, label: "女" },
            ],
          },
        ],
      },
    };
  },
  watch: {
    isInline(v) {
      this.formConfig.inline = v;
    },
  },
};
</script>
