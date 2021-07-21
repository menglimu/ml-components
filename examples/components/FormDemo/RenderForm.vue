<template>
  <div class="demo-container">
    <ml-form ref="mlForm" :config="formConfig" v-model="form"></ml-form>
  </div>
</template>

<script>
export default {
  name: 'RenderForm',
  data() {
    return {
      uiType: 'border',
      form: {
        name: [],
        height: '',
        height2: '',
        date1: '',
        date2: '',
      },
      formConfig: {
        size: 'small',
        uiType: 'border',
        // labelWidth: '100px',
        // inline: false,
        itemMaxWidth: '500px',
        itemBoxWidth: '100%',
        itemWidth: '100%',
        columns: [
          {
            type: '',
            label: '姓名',
            prop: 'name',
            value: [],
            render: (h, value) => {
              return (
                <div class="custom-item">
                  <c-input
                    v-model={value[0]}
                    class="m-input"
                    placeholder="请输入姓"
                  />
                  <c-input
                    v-model={value[1]}
                    class="m-input"
                    placeholder="请输入名"
                  />
                </div>
              )
            },
          },
          {
            type: 'input',
            label: '身高',
            prop: 'height',
            render: (h, value) => {
              return (
                <div class="custom-item">
                  <c-input v-model={value} class="m-input" />
                  <span class="suffix">cm</span>
                </div>
              )
            },
          },
          {
            type: 'input',
            label: '身高2',
            prop: 'height2',
            render: (h, value) => {
              return h(
                'div',
                {
                  class: 'custom-item',
                  props: { value: value },
                  on: {
                    input(v) {
                      value = v
                    },
                  },
                },
                [
                  h('c-input', { class: 'm-input' }),
                  h('span', { class: 'suffix' }, 'cm'),
                ]
              )
            },
          },
          {
            type: '',
            label: '活动时间',
            prop: 'date1',
            render: (h, value) => {
              return (
                <div class="custom-item">
                  <c-date-picker
                    class="m-input"
                    type="date"
                    placeholder="选择日期"
                    v-model={this.form.date1}
                    style="width: 50%;"
                  ></c-date-picker>
                  <c-time-picker
                    class="m-input"
                    placeholder="选择时间"
                    v-model={this.form.date2}
                    style="width: 50%;"
                  ></c-time-picker>
                </div>
              )
            },
          },
        ],
      },
    }
  },
  watch: {
    uiType(v) {
      this.formConfig.uiType = v
    },
  },
}
</script>

<style lang="scss">
.custom-item {
  display: flex;
  .m-input {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  .suffix {
    margin-left: 10px;
  }
}
</style>