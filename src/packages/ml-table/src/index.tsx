/**
 * 表格组件
 */
import Vue from 'vue'
import './table.scss'
import { PropType } from 'vue/types/umd'
import { TableSearchProp, MlTableConfig, MlTableInnerBtn, MlTableOuterBtn } from 'types/table'

export default Vue.extend({
  name: 'MlTable',
  props: {
    /** 表格搜索配置项  */
    searchConfig: { type: Object as PropType<TableSearchProp>, required: false },
    /** 表格配置项 */
    config: { type: Object as PropType<MlTableConfig>, required: true },
    /** 搜索表单附加值，会被输入框中的值覆盖 */
    searchData: { type: Object as PropType<AnyObj>, default: () => ({}) },

    /** 表格内按钮 */
    innerBtn: { type: Array, default: (): MlTableInnerBtn[] => [] },

    /** 表格外按钮 */
    outerBtn: { type: Array, default: (): MlTableOuterBtn[] => [] },

    /** 分页配置 */
    paginationConfig: { type: Object as PropType<ElPagination>, default: () => ({}) },
    /** 数据加载前的钩子函数 */
    beforeGetList: { type: Function as PropType<(type: string, params: any) => any> },

    /** 数据加载后的钩子函数 */
    afterGetList: { type: Function as PropType<(type: string, res: any) => void> }
  },
  data() {
    return {
      config_: null as MlTableConfig,
      data: [],
      loading: false, // 加载遮罩
      pageSize: 0,
      currentPage: 1,
      total: 0,
      sortProp: '',
      sortType: '' as '' | 'DESC' | 'ASC',
      multipleSelection:  = [], // 多选

  tags: Tags = null,

  searchInput: S = {} as any,

  defaultOptions: MlTableDefaultOptions,
  // 表格组件默认配置项
  paginationConfigDefault = {
    pageSizes: [10, 20, 30],
    pageSize: 10,
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper'
  },
  configDefault = {
    tableKey: 'id',
    showPagination: true,
    selection: true,
    reserveSelection: true,
    initSearch: true
  },
  TableDefault = {
    'element-loading-text': '拼命加载中',
    'element-loading-spinner': 'el-icon-loading',
    'element-loading-background': 'rgba(0, 0, 0, 0.8)'
  },
  columnDefaultIndex = {
    type: 'index',
    label: '序号',
    width: '50',
    align: 'cetner'
  },
  columnDefaultSelection = {
    type: 'selection',
    width: '50',
    align: 'center'
  },
  columnDefaultNormal = {
    align: 'left',
    showOverflowTooltip: true
  },
  columnDefaultControl = {
    align: 'center',
    label: '操作',
    fixed: 'right'
  },
  emptyWord = '暂无数据',
  emptyImg = require('./../assets/no-data.png'),
  framework = 'cui',
  outerBtnDefault = {
    size: 'samll'
  },
  innerBtnDefault = {
    size: 'samll'
  },
    }
  },
  methods: {},
  render() {
    return <div></div>
  }
})
