/**
 * 表单的单项
 */
import Vue, { VNode, CreateElement, VNodeData } from 'vue';
import { isNull } from '@/utils';
import { cloneDeep, isEqual } from 'lodash';
import merge from '@/utils/merge';
import { MlFormColumn, MlFormConfig } from 'types/form';
import { getFormColumn } from './config';

import MlForm from './form';
import Tags from '../../../utils/tags';
import { PropType } from 'vue/types/umd';

export default Vue.extend({
  name: 'FormItem',
  props: {
    configItem: { type: Object as PropType<MlFormColumn>, required: true },
    // 原始的value值，涉及到数据格式化转换问题，通过一个值进行中转
    originalValue: { type: null, required: true },
    rootValue: { type: null, required: true },
    rootConfig: { type: Object as PropType<MlFormConfig>, required: true },
    tags: { type: Object as PropType<Tags>, required: true }
  },
  data() {
    const options: AnyObj[] = []; // 下拉，单选，多选等的选择项
    const config_: MlFormColumn = null;
    return {
      show: null, // 是否显示隐藏
      beforeHideValue: null, // 隐藏前的值，进行保存，显示的时候，再进行回显
      options, // 下拉，单选，多选等的选择项
      config_
    };
  },
  computed: {
    value(this: any) {
      let value = this.originalValue;
      if (this.config_?.format?.toEleValue) {
        value = this.config_.format.toEleValue(value, this.rootValue);
      }
      return value;
    },
    isShow(this: any): boolean | undefined {
      let isShow: boolean | undefined;
      if (typeof this.config_.show === 'function') {
        isShow = this.config_.show(this.rootValue);
      } else {
        isShow = this.config_.show;
      }

      // 重新显示的时候，将之前的值抛出给父组件
      if (isShow && this.show === false) {
        this.$emit('show', this.beforeHideValue);
      } else if (!isShow && this.show === true) {
        // 切换不显示的时候，重置值
        this.beforeHideValue = cloneDeep(this.value);
        this.$emit('hide', this.config_.prop);
      }
      this.show = isShow;
      return this.show;
    },

    itemBoxWidth(this: any) {
      let width = this.config_.itemBoxWidth || this.rootConfig.itemBoxWidth;
      if (this.rootConfig.inline) {
        if (this.config_.block) {
          width = this.config_.itemBoxWidth || '100%';
        } else {
          width = width || '33.33%';
        }
      } else {
        width = width || '100%';
      }
      return width;
    },
    itemWidth(this: any) {
      let width = '100%';
      if (this.config_.block) {
        width = this.config_.itemWidth || '100%';
      } else {
        width = this.config_.itemWidth || this.rootConfig.itemWidth || '100%';
      }
      return width;
    },

    itemMaxWidth(this: any) {
      return this.config_.itemMaxWidth || this.rootConfig.itemMaxWidth || '400px';
    }
  },
  created() {
    this.$watch('configItem', this.onConfigChange, { immediate: true, deep: true });
    this.$watch('configItem.optionsGet', this.onOptionsGetChange, { immediate: true });
  },
  methods: {
    async onConfigChange() {
      this.config_ = getFormColumn(this.configItem);
    },

    async onOptionsGetChange() {
      if (typeof this.config_.optionsGet === 'function') {
        const res = await this.config_.optionsGet();
        if (Array.isArray(res.content)) {
          this.options = res.content;
        }
      }
    },
    onInput(value: any) {
      if (isEqual(this.value, value)) {
        return;
      }
      let val = value;
      if (this.config_?.format?.toValue) {
        val = this.config_.format.toValue(val, this.rootValue);
      }
      this.$emit('input', val);
    },

    renderChildren(h: CreateElement): VNode | VNode[] | Element | Element[] {
      if (typeof this.config_.children === 'function') {
        return this.config_.children(h);
      }
      const options = isNull(this.options) ? this.config_.options : this.options;
      if (['radio', 'checkbox', 'select'].includes(this.config_.type) && Array.isArray(options)) {
        // 下拉列表时，渲染下拉项
        if (this.config_.type === 'select') {
          const { TagOption } = this.tags;
          return options.map((option, index) => (
            <TagOption
              {...{ props: option }}
              key={index}
              label={this.config_.optionLabel ? option[this.config_.optionLabel] : option.label}
              value={this.config_.optionValue ? option[this.config_.optionValue] : option.value}
            ></TagOption>
          ));
        } else if (this.config_.type === 'radio' || this.config_.type === 'checkbox') {
          const tag = this.tags.prefix + this.config_.type;
          // 单选框、多选框
          return options.map((option, index) => (
            <tag
              {...{
                props: { ...option, label: this.config_.optionValue ? option[this.config_.optionValue] : option.value }
              }}
              key={index}
            >
              {this.config_.optionLabel ? option[this.config_.optionLabel] : option.label}
            </tag>
          ));
        }
      }
      return [];
    }
  },
  render(h: CreateElement) {
    if (!this.isShow) {
      return;
    }

    // 渲染vnode
    let vnode: VNode | Element;
    // 按钮等其他元素的渲染。 无prop属性名
    if (this.config_.render && !this.config_.prop) {
      let vnode = this.config_.render(h, this.value, this.onInput) as VNode;
      return vnode;
    } else if (this.config_.prop && this.config_.render) {
      // 有prop属性名和render同时存在的时候。render作为输入元素
      vnode = this.config_.render(h, this.value, this.onInput) as VNode;
      // 绑定value和input事件
      if (vnode.componentOptions) {
        vnode.componentOptions = merge(
          {
            // webpack 的 merge 会合并 2个 方法 同时执行
            listeners: { input: this.onInput },
            propsData: {
              size: this.rootConfig.size,
              disabled: this.rootConfig.disabled,
              clearable: this.rootConfig.clearable,
              placeholder: this.config_.placeholder,
              ...(this.config_?.nodeData?.props || {}),
              ...(this.config_?.props || {}),
              value: this.value
            }
          },
          vnode.componentOptions
        );
      }
      // vnode.data = vnode.data || {}
      // vnode.data.attrs = vnode.data.attrs || { placeholder: this.config_.placeholder }
      // vnode.data = merge({ attrs: { placeholder: this.config_.placeholder } }, vnode.data)
      vnode.data = merge(
        {
          attrs: {
            placeholder: this.config_.placeholder,
            ...(this.config_?.nodeData?.attrs || {}),
            ...(this.config_?.attrs || {})
          }
        },
        vnode.data
      );
    } else {
      // /* 一些基础类型的配置
      //   tag：标签名
      //   VNodeData: 渲染函数具体数据对象，参考vue文档 https://cn.vuejs.org/v2/guide/render-function.html
      //   children: 渲染的下级内容
      // */

      const defaultAttrs: VNodeData = {
        attrs: {
          placeholder: this.config_.placeholder
        },
        props: {
          value: this.value
        },
        on: {
          input: this.onInput
        }
      };
      const nodeData: VNodeData = merge(
        {
          props: {
            size: this.rootConfig.size, // input的size大小，element属性
            clearable: this.rootConfig.clearable, // 是否显示清除，element属性
            disabled: this.rootConfig.disabled // 是否禁用
          }
        },
        defaultAttrs,
        this.config_.nodeData,
        {
          props: this.config_.props || {},
          attrs: this.config_.attrs || {}
        }
      );

      const Tag = this.config_.tag || this.tags.prefix + this.config_.type;
      vnode = <Tag {...nodeData}>{this.renderChildren(h)}</Tag>;
    }

    const { TagFormItem } = this.tags;
    return (
      <div
        style={{ width: this.itemBoxWidth }}
        class={[
          this.config_.className,
          {
            'ml-form-item-box': true,
            'hide-round': this.config_.hideRound,
            hide: !this.isShow
          }
        ]}
      >
        <TagFormItem
          class={{
            'ml-form-item': true,
            ['ml-form-' + this.config_.type]: true,
            'ml-form-item-block': this.config_.block
            // 'is-not-value': this.isNotValue
          }}
          rules={this.config_.rules}
          style={{ width: this.itemWidth, maxWidth: this.itemMaxWidth }}
          label={this.config_.label}
          prop={this.config_.prop}
          labelWidth={this.config_.labelWidth === undefined ? this.rootConfig.labelWidth : this.config_.labelWidth}
        >
          {vnode}
        </TagFormItem>
      </div>
    );
  }
});
