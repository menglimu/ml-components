/*
 * @Author: wenlin
 * @Date: 2020-06-03 16:02:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 16:59:13
 * @Description:  获取表单子项的配置
 */
import { MlFormRule, MlFormColumn, ComponentsPreset } from 'types/form';
import { cloneDeep } from 'lodash';
import merge from '@/utils/merge';

/**
 * @description:  // 一些类型的基本属性
 * {tag} 标签名
 * VNodeData: 渲染函数具体数据对象，参考vue文档 https://cn.vuejs.org/v2/guide/render-function.html
 * children: 渲染的下级内容
 *
 */

let componentsPreset = {};

export function setComponentsPreset(prefix: string, others: ComponentsPreset = {}) {
  componentsPreset = {
    input: {
      tag: prefix + 'input',
      nodeData: {
        props: {
          type: 'text'
        }
      }
    },
    textarea: {
      tag: prefix + 'input',
      nodeData: {
        class: {
          'text-input': true
        },
        props: {
          type: 'textarea'
        },
        attrs: {
          rows: 4
        }
      }
    },
    select: {
      tag: prefix + 'select',
      nodeData: {
        props: {
          'popper-append-to-body': true
        }
      }
    },
    radio: {
      tag: prefix + 'radio-group'
    },
    checkbox: {
      tag: prefix + 'checkbox-group'
    },
    date: {
      tag: prefix + 'date-picker'
    },
    time: {
      tag: prefix + 'time-picker'
    },
    color: {
      tag: prefix + 'color-picker'
    },
    ...others
  };
}

// 设置组件内的默认属性
function getPreset(config: MlFormColumn) {
  // 根据不同类型，匹配不同默认配置，多种类型共用一个配置的情况
  let defaultConfig: AnyObj = { nodeData: { props: {} } };

  // 没有类型时。默认为input输入框
  if (!(config.type || config.tag || config.render)) {
    defaultConfig = componentsPreset['input'];
  }

  if (config.type) {
    if (['string'].includes(config.type)) {
      defaultConfig = componentsPreset['input'];
    } else if (['date', 'dates', 'daterange', 'datetime', 'datetimerange'].includes(config.type)) {
      defaultConfig = componentsPreset[config.type] || componentsPreset['date'];
      defaultConfig.nodeData = { props: { type: config.type } };
    } else if (['time', 'timerange'].includes(config.type)) {
      defaultConfig = componentsPreset[config.type] || componentsPreset['time'];
      defaultConfig.nodeData = { props: { type: config.type } };
    } else {
      defaultConfig = componentsPreset[config.type] || {};
    }

    // 时间，日期的数据初始化
    if (['time', 'timerange'].includes(config.type)) {
      defaultConfig.nodeData.props['value-format'] = 'HH:mm:ss';
      if (config.type === 'timerange') {
        defaultConfig.nodeData.props['is-range'] = true;
      }
    } else if (['date', 'dates', 'daterange'].includes(config.type)) {
      defaultConfig.nodeData.props['value-format'] = 'yyyy-MM-dd';
    } else if (['datetime', 'datetimerange'].includes(config.type)) {
      defaultConfig.nodeData.props['value-format'] = 'yyyy-MM-dd HH:mm:ss';
    }
    if (['datetimerange'].includes(config.type)) {
      defaultConfig.nodeData.props['default-time'] = ['00:00:00', '23:59:59'];
    }

    if (['datetimerange', 'daterange'].includes(config.type)) {
      defaultConfig.nodeData.props['range-separator'] = '至';
      defaultConfig.nodeData.props['start-placeholder'] = '开始时间';
      defaultConfig.nodeData.props['end-placeholder'] = '结束时间';
    }
  }
  return defaultConfig;
}
// 设置表单项的校验规则
function getRules(config: MlFormColumn) {
  // 因为空校验和错误校验，UI颜色区别，所以要实时判空的原因，将所有的校验trigger修改为change
  const trigger: 'blur' | 'change' = 'blur';

  // 生成默认的一些校验规则
  const rules: Array<MlFormRule> = [];
  if (config.minlength !== undefined) {
    rules.push({
      pattern: new RegExp(`^(.|\n){${config.minlength},}$`),
      // min: config.minlength,
      message: `输入字符不能少于${config.minlength}个字符`,
      trigger: trigger
    });
  }
  if (config.maxlength !== undefined) {
    rules.push({
      pattern: new RegExp(`^(.|\n){0,${config.maxlength}}$`),
      // max: config.maxlength,
      message: `输入字符不能大于${config.maxlength}个字符`,
      trigger: trigger
    });
  }
  if (config.reg) {
    rules.push({
      pattern: new RegExp(config.reg), // /^\[\d+,\d+\]$/
      message: config.error,
      trigger: trigger
    });
  }
  if (config.required) {
    rules.push({
      required: true,
      message: config.error,
      trigger: trigger
    });
  }
  config.rules = [...(config.rules || []), ...rules];
}

export function getFormColumn(mlFormColumn: MlFormColumn): MlFormColumn {
  let config = cloneDeep(mlFormColumn);

  let placeholderPrefix = '输入';

  if (
    config.type &&
    [
      'date',
      'dates',
      'daterange',
      'datetime',
      'datetimerange',
      'time',
      'timerange',
      'select',
      'tree',
      'cascader'
    ].includes(config.type)
  ) {
    placeholderPrefix = '选择';
  }

  // 初始化正则验证及提示
  if (!config.placeholder && config.label) {
    config.placeholder = `请${placeholderPrefix}${config.label}`;
  }
  if (!config.error && config.label) {
    config.error = `请核对${placeholderPrefix}项${config.label}`;
  }
  // 初始化显示条件
  if (!config.hasOwnProperty('show')) {
    config.show = true;
  }
  // 通过config类型，初始化规则和匹配预设组件默认值
  getRules(config);
  return merge(getPreset(config), config);
}
