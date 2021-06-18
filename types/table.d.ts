/*
 * @Author: wenlin
 * @Date: 2020-11-25 16:01:56
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-28 14:46:58
 * @Description:
 */

import { ElTableColumn, TableColumnType } from 'element-ui/types/table-column'
import { ElTable } from 'element-ui/types/table'
import { ElButton } from 'element-ui/types/button'
import { ElPagination } from 'element-ui/types/pagination'
import { VNode, CreateElement, VNodeData } from 'vue/types/umd'
import { MlFormConfig } from '@cci/ml-form/types'
import { AnyObj, Partial } from '.'
import { VueComponentInstall } from './components'

/** D为表格内容类型。S为搜索条件类型 */
export class MlTable<D = AnyObj, S = AnyObj> extends VueComponentInstall {
  searchInput: S // 搜索表单值
  data: D[] // 表格数据
  loading: boolean // 是否加载遮罩
  pageSize: number // 分页大小
  currentPage: number // 分页页码
  total: number // 总数
  // sort = ''
  // sortType = ''
  multipleSelection: D[] // 选择的表格项

  elTable: ElTable // element的表格对象

  // 刷新表格数据
  refresh(): void
  // 重置查询条件并搜索
  onReset(data?: AnyObj): void
  // 搜索，等同于通过按钮触发。会重置分页条件
  onSearch(data?: AnyObj): void
  // 搜索
  search(type?: string, data?: AnyObj): void
}

/** 表格的prop，方便把表格的prop放在一个对象里面进行处理 */
export interface MlTableProps<D = AnyObj, S = AnyObj> {
  /** 表格头部搜索项 */
  searchConfig?: TableSearchProp<D>

  /** 表格配置项 */
  config: MlTableConfig<D, S>

  /** 分页相关配置项 */
  paginationConfig?: Pagination

  /** 搜索表单附加值，会被输入框中的值覆盖 */
  searchData?: AnyObj

  /** 表格内按钮 */
  innerBtn?: MlTableInnerBtn<D>[]

  /** 表格外按钮 */
  outerBtn?: MlTableOuterBtn<D>[]

  /** 数据加载前的钩子函数，可处理请求参数，也可在api中的list方法中处理请求 */
  beforeGetList?: (type: string, params: S & TableParams) => AnyObj
  /** 数据加载后的钩子函数 */
  afterGetList?: (type: string, res: AnyObj) => void
}

interface TableParams {
  pageSize?: number
  pageNum?: number
  sortColumn?: string
  sortAsc?: boolean
  // [P in keyof S]?: S[P]
}

/** 分页相关配置。其他配置内容可参考 分页组件参数 */
interface Pagination extends AnyObj, Partial<ElPagination> {}

/** 表格内按钮配置。其他配置内容可参考 按钮组件参数 */
interface MlTableInnerBtn<D> extends Partial<ElButton> {
  /** 触发的事件类型，在表格组件上使用@xxx来监听事件 */
  evtType: string

  /** 按钮内的文字 */
  name: string

  /** element所支持的图标，查看element内的文档 */
  Elicon?: string
  /** svg图标，参考svg-icon的实现 */
  icon?: string

  /** 可使用函数返回true/false，判断显示，参数为行数据，使用对象的时候，对象内的每个属性和行数据相等时可用 */
  showJudge?: AnyObj | ((data: D) => boolean) // {status: 1,title: '123'}

  render?: (h: CreateElement, scoped?: any) => VNode | Element
}

/** 表格外按钮配置 */
interface MlTableOuterBtn<D> extends MlTableInnerBtn<D> {
  /** false   不选,(其他值)， 单选，多选， */
  selection?: 'none' | 'single' | 'multiple' | ''

  /** 与 innerBtn不同，只能使用函数返回true/false */
  showJudge?: (data: D[]) => boolean
}

/** 重新element的单项配置，解决兼容性 */
interface ElTableColumnAny extends Partial<ElTableColumn> {
  type: any
  label: string
  prop: string
}

type MlTableType = '' | 'string' | 'image' | 'svg' | 'select' | 'tree' | 'cascader'

interface MlColumnBase<O = AnyObj> {
  /** 表格项的label名 */
  label?: string

  /** 表格项的数据key名 */
  prop?: string

  /** 表格的类型，自定义的时候，传''或者不传
   * @default string
   */
  type?: MlTableType

  /** 下拉，单选多选等数据的选项 */
  options?: Array<O>

  /** 异步获取的数据选项函数 */
  optionsGet?: () => Promise<{ content: O[] }>

  /** 下拉显示的名字key 默认label
   * @default label
   */
  optionLabel?: string

  /** 下拉取值得key 默认value
   * @default value
   */
  optionValue?: string

  /** 树形的children取值 默认children
   * @default children
   */
  optionChildren?: string
}

/** 表格的具体项配置，更多内容可参考 UI框架中的表格组件 */
interface MlTableColumn<D> extends MlColumnBase, ElTableColumnAny {
  /** 表格中的类型包括 */
  type?: MlTableType | TableColumnType

  /** 状态处理。对象内分别为状态名和满足的条件
   * success: 绿色，error：红色，warning：橙色，done：蓝色，failed：灰色
   */
  statusJudge?:
    | {
        success?: AnyObj
        error?: AnyObj
        warning?: AnyObj
        done?: AnyObj
        failed?: AnyObj
        [key: string]: AnyObj
      }
    | ((data: D) => string | 'success' | 'error' | 'warning' | 'done' | 'failed')

  /** 图片的时候，是否使用预览 */
  noPre?: boolean

  /** 图片的前缀路径 */
  baseUrl?: string

  /** 自定义表格内容的展示 */
  render?: (
    h: CreateElement,
    params: {
      column: MlTableColumn<D>
      row: D
      index: number
    }
  ) => VNode | Element
  /** 自定义整列内容，应返回<c-table-column></c-table-column> */
  renderColumn?: (h: CreateElement) => VNode | Element
}

/** 搜索相关配置 */
export interface TableSearchProp<D> {
  /** 搜索和重置按钮在输入项后显示，！输入项不能占满元素 默认 true */
  isBtnInForm?: boolean

  /** 超过一行隐藏。默认 false */
  isOverHide?: boolean

  /** 搜索表单配置 */
  config?: MlFormConfig<D>

  /** 隐藏按钮的样式 */
  hideUIType?: 'button' | 'bottom'
}

/** 表格配置 */
export interface MlTableConfig<D = AnyObj, S = AnyObj> extends Partial<ElTable> {
  /** 多选，默认true */
  selection?: boolean

  /** 多选时候，分页，保存选择状态 */
  reserveSelection?: boolean

  /** 序号 默认false */
  index?: boolean

  /** 是否tree，属性表格，根据业务加上的 */
  // tableTree?: boolean

  /** 主键，默认id */
  tableKey?: string

  /** 表格操作宽度 */
  tableOptWidth?: string

  /** 请求的接口列表 */
  api?: {
    /**
     * 删除接口，evtType为mldelete时触发内部删除并使用改方法
     * @param {String} ids id拼接的字符串
     * @param {Array} data 要删除的数据列表
     */
    delete?: (ids: string, data?: D[]) => Promise<any>

    /** 查询列表数据 */
    list?: (data: S & TableParams) => Promise<{
      total: number
      content: D[]
    }>

    /** 树形数据查询 */
    // tree?(
    //   data: S & TableParams
    // ): Promise<{
    //   content: D[]
    // }>

    /** TODO：导入数据 */
    import?: (data: S & TableParams) => Promise<any>

    /** TODO：导出数据 */
    export?: (data: S & TableParams) => Promise<any>
  }
  /** 初始化的时候，是否直接请求数据，默认 true */
  initSearch?: boolean

  /** 是否显示分页，默认 true */
  showPagination?: boolean

  /** 表格的具体项 */
  columns: Array<MlTableColumn<D>>

  /** 表格的扩展数据 */
  nodeData?: VNodeData
}

/** use的时候使用的一些默认配置项 */
export interface MlTableDefaultOptions {
  paginationConfigDefault?: Partial<Pagination>
  configDefault?: Partial<MlTableConfig>
  TableDefault?: Partial<ElTable> & AnyObj
  columnDefaultIndex?: ElTableColumnAny
  columnDefaultSelection?: ElTableColumnAny
  columnDefaultNormal?: ElTableColumnAny
  columnDefaultControl?: ElTableColumnAny
  emptyWord?: string
  emptyImg?: any
  framework?: 'cui' | 'element-ui'
  outerBtnDefault?: Partial<ElButton>
  innerBtnDefault?: Partial<ElButton>
}
