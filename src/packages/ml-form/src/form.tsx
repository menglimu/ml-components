import './form.scss'

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import FormItem from './form-item'
import { cloneDeep, isEqual } from 'lodash'
import { MlFormConfig, MlFormColumn, MlFormProp, MlFormDefaultOptions } from 'types/form'
import { ElForm } from 'element-ui/types/form'
import merge from '@/utils/merge'
import Tags from './tags'
import { setComponentsPreset } from './config'

@Component({
  name: 'MlForm',
  components: { FormItem }
})
export default class MlForm<D> extends Vue implements MlFormProp<D> {
  @Prop({ required: true, type: Object }) value: any
  @Prop({ required: true, type: Object }) config!: MlFormConfig<D>

  $refs!: {
    form: ElForm
  }
  initValue: AnyObj = {} // 初始值
  config_: MlFormConfig = null // form的配置项

  value_: AnyObj = {} // form的值

  tags: Tags = null
  // 一些默认值的配置。可通过use的时候进行修改
  defaultOptions: MlFormDefaultOptions
  // ui框架类型
  framework = 'cui'
  componentsPreset = {}
  // config 默认值
  configDefault = {
    inline: true,
    labelWidth: '100px',
    // uiType: 'round',
    clearable: true
  }

  @Watch('config', { deep: true, immediate: true })
  onConfigChange() {
    this.config_ = this.getConfig_()
    this.init()
  }

  @Watch('value', { deep: true })
  onParentValueChange(value: AnyObj) {
    if (this.config_?.format?.toEleValue) {
      value = this.config_.format.toEleValue(value)
    }
    if (isEqual(value, this.value_)) return
    this.value_ = value
  }

  created() {
    this.initDefault()
  }
  mounted() {
    // 对于form里表单的属性采用代理引入。避免重复引用
    for (const key in this.$refs.form) {
      if (this.$refs.form.hasOwnProperty(key) && key in this === false) {
        Object.defineProperty(this, key, {
          get: () => {
            return this.$refs.form[key]
          }
        })
      }
    }
    this.autoSize()
  }
  // 自动size相关
  autoSize() {
    // 自适应form的size
    let timer: number = null
    if (this.config_.autoSize) {
      this.getSize()
      window.onresize = () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(this.getSize, 200)
      }
    }
  }
  getSize() {
    const Width =
      window.innerWidth || //浏览器窗口的内部宽度（包括滚动条）
      document.documentElement.clientWidth ||
      document.body.clientWidth
    if (Width < 1366) {
      // this.size = 'mini'
      this.$set(this.config_, 'size', 'mini')
    } else if (Width < 1600) {
      // this.size = 'small'
      this.$set(this.config_, 'size', 'small')
    } else if (Width < 1680) {
      // this.size = 'medium'
      this.$set(this.config_, 'size', 'medium')
    }
  }

  // use时的初始值的处理
  initDefault() {
    this.defaultOptions = (this as any).MlForm
    if (this.defaultOptions) {
      for (const key in this.defaultOptions) {
        if (typeof this.defaultOptions[key] === 'object') {
          this[key] = merge(this[key], this.defaultOptions[key])
        } else {
          this[key] = this.defaultOptions[key]
        }
      }
    }
    this.tags = new Tags(this.framework)
    setComponentsPreset(this.tags.prefix, this.componentsPreset)
  }

  // 初始化值
  init() {
    let value = this.value
    if (this.config_?.format?.toEleValue) {
      value = this.config_.format.toEleValue(value)
    }
    const defaultValue = this.getDefaultValue()
    this.value_ = Object.assign({}, defaultValue, value)
    this.initValue = defaultValue
    this.emitValue()
  }

  // 合并表单配置项， 通过 Object.assign 简写初始化
  getConfig_() {
    const config = merge<MlFormConfig>(
      this.configDefault,
      {
        // autoSize: this.config.size ? false : true,
        labelPosition: this.config.uiType === 'round' ? 'center' : 'right'
      },
      this.config
    )
    if (!config.inline) {
      config.itemMaxWidth = 'inherit'
    }
    if (this.config_?.autoSize && this.config_?.size) {
      config.size = this.config_.size
    }
    return config
  }

  // 重置初始值
  reset() {
    this.$emit('input', cloneDeep(this.initValue))
    this.clearValidate()
  }
  // 验证数据 使用表单默认的验证

  // 重写form的 resetFields
  resetFields() {
    this.reset()
  }

  // 使用change的时候。需要将清除延后
  clearValidate(props?: string | string[]) {
    this.$nextTick(() => {
      this.$refs.form?.clearValidate(props)
    })
  }

  emitValue() {
    let value_ = this.value_
    // !!! 此处可能会改变value的引用。可能会引起值整体的变化。性能问题?
    if (this.config_?.format?.toValue) {
      value_ = this.config_.format.toValue(this.value_)
    }
    if (isEqual(this.value, value_)) return
    this.$emit('input', value_)
  }
  // 监听值改变设置某一项value_的值
  onInput(prop: string, value: any) {
    if (!prop) return
    this.$set(this.value_, prop, value)
    this.emitValue()
  }

  // 获取选项默认值
  getDefaultValue(): any {
    // const list = this.config_.columns.filter(item => item.type !== 'special')
    const defaultValue = {}
    this.config_.columns.forEach(column => {
      if (column.prop) {
        defaultValue[column.prop] = this.getValByType(column)
      }
    })
    return cloneDeep(defaultValue)
  }
  // 注释掉一些初始值的处理。代码尽量简洁
  getValByType(column: MlFormColumn<D>) {
    if (column.hasOwnProperty('value')) {
      return column.value
    }
    return null
  }

  render() {
    // eslint-disable-next-line
    const { uiType, columns, format, ...formAttrs } = this.config_
    const { TagForm } = this.tags
    return (
      // 通过解构。将所有用户属性解构到form中
      <TagForm
        ref="form"
        attrs={formAttrs}
        props={{ model: this.value_ }}
        class={[uiType, this.config_.size, 'label-' + this.config_.labelPosition, 'ml-form']}>
        {columns.map((item, index) => {
          return (
            <FormItem
              tags={this.tags}
              key={index}
              configItem={item}
              originalValue={this.value_[item.prop]}
              rootValue={this.value_}
              rootConfig={this.config_}
              onInput={(value: any) => this.onInput(item.prop, value)}
              // onHide={this.onHide}
              // onShow={(e: object) => this.onShow(item, e)}
            />
          )
        })}
        {this.$slots.default}
      </TagForm>
    )
  }
}
