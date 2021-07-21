<script>
export default {
  name: "BaseForm",
  data() {
    return {
      form: {
        name: "",
        type: null,
      },
      formConfig: {
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
            options: [
              { value: 1, label: "男" },
              { value: 0, label: "女" },
            ],
          },
        ],
      },
    };
  },
};
</script>
<template>
  <div class="demo-container">
    <ml-form v-model="form" :config="formConfig"></ml-form>
  </div>
</template>
