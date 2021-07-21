<template>
  <div class="demo-container">
    <c-radio-group v-model="labelPosition" size="small" class="radio-group">
      <c-radio-button label="left">左对齐</c-radio-button>
      <c-radio-button label="right">右对齐</c-radio-button>
      <c-radio-button label="top">顶部对齐</c-radio-button>
    </c-radio-group>

    <ml-form :config="formConfig" v-model="form"></ml-form>
  </div>
</template>

<script>
export default {
  name: "LabelPositionForm",
  data() {
    return {
      labelPosition: "left",
      form: {
        name: "",
        ename: "",
        type: "",
      },
      formConfig: {
        size: "small",
        uiType: "border",
        labelWidth: "80px",
        labelPosition: "left",
        inline: true,
        itemMaxWidth: "520px",
        itemBoxWidth: "100%",
        itemWidth: "100%",
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
    labelPosition(v) {
      this.formConfig.labelPosition = v;
    },
  },
};
</script>
