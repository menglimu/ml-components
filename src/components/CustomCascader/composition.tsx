import { defineComponent, ref, computed } from '@vue/composition-api';
import 'index.scss';

let Component = defineComponent({
  props: {
    options: { type: Array, required: true },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    value: { type: String, default: '' },
    props: { type: Object, default: () => ({}) }
  },
  setup(props, { emit, attrs, refs }) {
    let propsObj = computed(() => ({
      checkStrictly: true,
      expandTrigger: 'hover',
      emitPath: false,
      value: props.optionValue,
      label: props.optionLabel,
      ...props.props
    }));
    function onClick(value) {
      // const value_ = this.value === value ? null : value
      onInput(value);
      const cascader = ref(null);
      cascader.toggleDropDownVisible(false);
    }
    function onInput(value) {
      emit('input', value);
    }
    return (
      <el-cascader
        ref="cascader"
        class={'custom-cascader'}
        popper-class="custom-cascader-popper"
        value={props.value}
        onInput={onInput}
        options={props.options}
        props={{ ...attrs, props: propsObj }}
        scopedSlots={{
          default: ({ data }) => (
            <div onClick={() => onClick(data[propsObj.value.value])}>{data[propsObj.value.label]}</div>
          )
        }}
      ></el-cascader>
    );
  }
});
let com = new Component({ propsData: { value: 1 } });
console.log(com);
export default Component;
