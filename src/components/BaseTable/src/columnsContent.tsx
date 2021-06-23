/*
 * @Author: wenlin
 * @Date: 2020-02-25 10:25:33
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 11:36:43
 * @Description:  只保留form中的公共方法
 */
import { getJudge } from '@/utils';
import { MlTableColumn, MlTableConfig } from 'types/table';
import { CreateElement } from 'vue/types/umd';

// 获取树形的值
function getTreeVal(
  id: string | number,
  options: any[],
  { optionLabel = 'label', optionValue = 'value', optionChildren = 'children' } = {}
): string {
  let result;
  for (const item of options) {
    if (item[optionValue] === id) {
      result = item[optionLabel];
      break;
    } else if (item.children) {
      result = getTreeVal(id, item[optionChildren], { optionLabel, optionValue, optionChildren });
      if (result) break;
    }
  }
  return result;
}

/**
 * @description: 将存的值转换为文本
 * @param {cellValue} 待转换的值
 * @param {config} 当前column的配置
 * @return: 转换后的文本，可能含有标签的字符串
 */
export function formatterFormValue<D>(
  cellValue: string | number | Array<string | number>,
  config: MlTableColumn<D>
): string | number {
  if (!['select', 'cascader', 'tree'].includes(config.type) && !Array.isArray(cellValue)) {
    return cellValue;
  }
  const valueArr: Array<string | number> = Array.isArray(cellValue) ? cellValue : [cellValue];
  if (['select'].includes(config.type) && Array.isArray(config.options)) {
    const value: string[] = [];
    config.options
      .filter(obj => valueArr.filter(val => obj[config.optionValue || 'value'] == val).length > 0)
      .forEach(obj => {
        config.optionLabel ? value.push(obj[config.optionLabel]) : value.push(obj.label);
      });
    return value.join(',');
  } else if (config.type === 'cascader') {
    let ary = config.options || [];
    let label = null;
    for (const val of valueArr) {
      let obj = ary.find(obj => obj[config.optionValue || 'value'] == val);
      if (obj) {
        label = obj[config.optionLabel || 'label'];
        ary = obj[config.optionChildren || 'children'] || [];
      } else {
        label = '';
      }
    }
    return label;
  } else if (['tree'].includes(config.type) && Array.isArray(config.options)) {
    if (Array.isArray(cellValue)) {
      cellValue.map(id => getTreeVal(id, config.options || [], config));
    } else {
      return getTreeVal(cellValue, config.options || [], config);
    }
  }
  if (Array.isArray(cellValue)) {
    return cellValue.join(',');
  }
  return cellValue;
}

/**
 * @description: 获取各类型的默认render来自定义表格显示内容
 * @param {column} 配置项
 * @return:
 */

interface RowParams<D> {
  row: any;
  column: MlTableColumn<D>;
}

function getStatusNames(className: string[], statusJudge: AnyObj, row: AnyObj) {
  if (typeof statusJudge === 'function') {
    return statusJudge(row);
  }
  if (statusJudge) {
    Object.keys(statusJudge).map(status => getJudge(statusJudge[status], row) && className.push(status));
  }
  return className;
}

function getBaseRender<D>(column: MlTableColumn<D>) {
  if (column.type === 'image') {
    return (h: CreateElement, params: RowParams<D>) => {
      let preList = params.row[column.prop];
      if (preList) {
        if (!Array.isArray(preList)) {
          preList = [preList];
        }

        if (column.baseUrl) {
          preList = preList.map((url: string) => column.baseUrl + url);
        }
        const className = getStatusNames(['td-img-box'], column.statusJudge, params.row);
        return (
          <div class={className}>
            {preList.map((item: string) => {
              if (column.noPre) {
                return <img class="td-img" src={item} />;
              } else {
                return <el-image class="td-img" fit="cover" src={item} preview-src-list={preList} />;
              }
            })}
          </div>
        );
      } else {
        return <span></span>;
      }
    };
  } else if (column.type === 'svg') {
    return (h: CreateElement, params: RowParams<D>) => {
      if (params.row[column.prop]) {
        const className = getStatusNames(['td-svg-box'], column.statusJudge, params.row);
        return (
          <div class={className}>
            <svg-icon class="td-svg" icon-class={params.row[column.prop]} />
          </div>
        );
      } else {
        return <span></span>;
      }
    };
  } else {
    return (h: CreateElement, params: RowParams<D>) => {
      const className = getStatusNames(['td-text'], column.statusJudge, params.row);

      if (column.formatter) {
        return <div class={className}>{column.formatter(params.row, column as any)}</div>;
      }
      return (
        <span class={className} domPropsInnerHTML={formatterFormValue(params.row[column.prop], params.column)}></span>
      );
    };
  }
}

export function columnsHandler(config: MlTableConfig<any, any>) {
  config.columns.forEach(column => {
    if (typeof column.optionsGet === 'function') {
      column.options = [];
      column.optionsGet().then(res => {
        if (Array.isArray(res.content)) {
          column.options = res.content;
        }
      });
    }
    if (!column.render) {
      column.render = getBaseRender(column);
    }
  });
}
