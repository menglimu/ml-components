import Vue from 'vue';
export default Vue.ex({
  name: 'CustomCascader',
  props: {
    options: { type: Array, required: true },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    value: { type: null, dault: null },
    props: { type: Object, default: () => ({}) }
  },
  computed: {
    propsObj(this: any) {
      return Object.assign(
        {},
        {
          checkStrictly: true,
          expandTrigger: 'hover',
          emitPath: false,
          value: this.optionValue,
          label: this.optionLabel
        },
        this.props
      )
    }
  },
  methods: {
    onClick(value) {
      // const value_ = this.value === value ? null : value
      this.$emit('input', value)
      const cascader = this.$refs.cascader as any
      cascader.toggleDropDownVisible(false)
    },
    onInput(value) {
      this.$emit('input', value)
    }
  },
  render() {
    return (
      <el-cascader
        ref="cascader"
        class="custom-cascader"
        popper-class="custom-cascader-popper"
        value={this.value}
        onInput={this.onInput}
        options={this.options}
        props={{ ...this.$attrs, props: this.propsObj }}
        scopedSlots={{
          default: ({ data }) => (
            <div onClick={() => this.onClick(data[this.propsObj.value])}>{data[this.propsObj.label]}</div>
          )
        }}></el-cascader>
    )
  }
})