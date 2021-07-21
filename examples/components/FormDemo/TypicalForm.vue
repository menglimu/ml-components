<template>
  <div class="demo-container">
    <ml-form :config="formConfig" v-model="form"></ml-form>
  </div>
</template>

<script>
export default {
  name: 'TypicalForm',
  data() {
    return {
      form: {
        name: '',
        ename: '',
        type: null,
        remarks: '',
        skills: [],
        files: [],
        startDate: '',
        dates: [],
        daterange: [],
        time: '',
        timerange: [],
        datetime: '',
        datetimerange: [],
        color: '',
        cascader: '',
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
          },
          {
            type: 'string',
            label: '英文名',
            prop: 'ename',
          },
          {
            type: 'select',
            label: '性别',
            prop: 'type',
            options: [
              { value: 1, label: '男' },
              { value: 0, label: '女' },
            ],
          },
          {
            type: 'radio',
            label: '性别',
            prop: 'type',
            options: [
              { value: 1, label: '男' },
              { value: 0, label: '女' },
            ],
          },
          {
            type: 'checkbox',
            label: '技能',
            prop: 'skills',
            options: [
              { value: 1, label: 'Java' },
              { value: 0, label: 'JavaScript' },
            ],
          },
          {
            type: 'textarea',
            label: '备注',
            prop: 'remarks',
          },
          {
            type: 'date',
            label: '开始日期',
            prop: 'startDate',
          },
          {
            type: 'dates',
            label: '多个日期',
            prop: 'dates',
          },
          {
            type: 'daterange',
            label: '日期段',
            prop: 'daterange',
          },
          {
            type: 'time',
            label: '时间',
            prop: 'time',
          },
          {
            type: 'timerange',
            label: '时间段',
            prop: 'timerange',
          },
          {
            type: 'datetime',
            label: '日期时间',
            prop: 'datetime',
          },
          {
            type: 'datetimerange',
            label: '日期时间段',
            prop: 'datetimerange',
          },
          {
            type: 'color',
            label: '颜色',
            prop: 'color',
          },
          // {
          //   type: 'cascader',
          //   label: '级联',
          //   prop: 'cascader',
          //   options: [
          //     {
          //       value: 'zhinan',
          //       label: '指南',
          //       children: [
          //         {
          //           value: 'shejiyuanze',
          //           label: '设计原则',
          //           children: [
          //             {
          //               value: 'yizhi',
          //               label: '一致',
          //             },
          //             {
          //               value: 'fankui',
          //               label: '反馈',
          //             },
          //           ],
          //         },
          //         {
          //           value: 'zujian',
          //           label: '组件',
          //         },
          //       ],
          //     },
          //   ],
          // },
        ],
      },
    }
  },
}
</script>