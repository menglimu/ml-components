<template>
  <div class="demo-container">
    <c-radio-group v-model="size" size="small" class="radio-group">
      <c-radio-button label="large">large</c-radio-button>
      <c-radio-button label="medium">medium</c-radio-button>
      <c-radio-button label="small">small</c-radio-button>
      <c-radio-button label="mini">mini</c-radio-button>
    </c-radio-group>

    <ml-form ref="mlForm" :config="formConfig" v-model="form"></ml-form>
  </div>
</template>

<script>
export default {
  name: 'SizeForm',
  data() {
    return {
      size: 'small',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
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
            type: 'input',
            label: '活动名称',
            prop: 'name',
            nodeData: {
              props: {
                size: 'large',
              },
            }
          },
          {
            type: 'select',
            label: '活动名称',
            prop: 'region',
            options: [
              { label: '区域一', value: 'shanghai' },
              { label: '区域二', value: 'beijing' },
            ],
          },
          {
            type: '',
            label: '活动时间',
            prop: 'date1',
            render: (h, value) => {
              return (
                <div>
                  <c-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model={this.form.date1}
                    style="width: 50%;"
                  ></c-date-picker>
                  <c-time-picker
                    placeholder="选择时间"
                    v-model={this.form.date2}
                    style="width: 50%;"
                  ></c-time-picker>
                </div>
              )
            },
          },
          {
            type: 'checkbox',
            label: '活动性质',
            prop: 'type',
            value: [],
            placeholder: '选择活动性质',
            options: [
              { label: '美食/餐厅线上活动', value: '1' },
              { label: '地推活动', value: '2' },
              { label: '线下主题活动', value: '3' },
            ],
          },
          {
            type: 'radio',
            label: '特殊资源',
            prop: 'resource',
            placeholder: '选择特殊资源',
            options: [
              { label: '线上品牌商赞助', value: '1' },
              { label: '线下场地免费', value: '2' },
            ],
            nodeData: {
              props: {
                size: 'mini',
                'text-color': '#245a91',
                fill: '#e35cb7',
              },
              attrs: {
                size: 'mini',
                disabled: true,
                'text-color': '#245a91',
                fill: '#e35cb7',
              }
            }
          },
        ],
      },
    }
  },
  watch: {
    size(v) {
      this.formConfig.size = v
    },
  }
}
</script>