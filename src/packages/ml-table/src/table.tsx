import './table.scss'

import { Component, Vue, Prop, Watch, Provide } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import {
  MlTableConfig,
  MlTableInnerBtn,
  MlTableOuterBtn,
  MlTableProps,
  TableParams,
  MlTable as MlTableImp,
  MlTableColumn,
  TableSearchProp,
  MlTableDefaultOptions
} from 'types/table'
import { ElTable } from 'element-ui/types/table'

import TableSearch from './TableSearch'

import { ElPagination } from 'element-ui/types/pagination'
import { getJudge } from '@/utils'
import webpackMerge from 'webpack-merge'
import Tags from './tags'
import { cloneDeep } from 'lodash'

import { columnsHandler } from './columnsContent'
import merge from 'webpack-merge'
@Component({
  inheritAttrs: false // 禁止继承attribute
})
export default class MlTable<D = AnyObj, S = AnyObj> extends Vue implements MlTableProps<D, S>, MlTableImp<D, S> {
  /** 表格配置项 */
  @Prop({ type: Object, required: false })
  readonly searchConfig!: TableSearchProp<D>

  /** 表格配置项 */
  @Prop({ type: Object, required: true })
  readonly config!: MlTableConfig<D, S>

  /** 搜索表单附加值，会被输入框中的值覆盖 */
  @Prop({ type: Object, default: () => ({}) })
  readonly searchData?: AnyObj

  /** 表格内按钮 */
  @Prop({ type: Array, default: (): MlTableInnerBtn<D>[] => [] })
  readonly innerBtn?: MlTableInnerBtn<D>[]

  /** 表格外按钮 */
  @Prop({ type: Array, default: (): MlTableOuterBtn<D>[] => [] })
  readonly outerBtn?: MlTableOuterBtn<D>[]

  /** 分页配置 */
  @Prop({ type: Object, default: () => ({}) })
  readonly paginationConfig: ElPagination

  /** 数据加载前的钩子函数 */
  @Prop({ type: Function })
  readonly beforeGetList?: (type: string, params: any) => any

  /** 数据加载后的钩子函数 */
  @Prop({ type: Function })
  readonly afterGetList?: (type: string, res: any) => void

  config_: MlTableConfig<D, S> = null
  data: D[] = []
  loading = false // 加载遮罩
  pageSize = 0
  currentPage = 1
  total = 0
  sortProp = ''
  sortType: '' | 'DESC' | 'ASC' = ''

  multipleSelection: D[] = [] // 多选

  tags: Tags = null

  searchInput: S = {} as any

  defaultOptions: MlTableDefaultOptions
  // 表格组件默认配置项
  paginationConfigDefault = {
    pageSizes: [10, 20, 30],
    pageSize: 10,
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper'
  }
  configDefault = {
    tableKey: 'id',
    showPagination: true,
    selection: true,
    reserveSelection: true,
    initSearch: true
  }
  TableDefault = {
    'element-loading-text': '拼命加载中',
    'element-loading-spinner': 'el-icon-loading',
    'element-loading-background': 'rgba(0, 0, 0, 0.8)'
  }
  columnDefaultIndex = {
    type: 'index',
    label: '序号',
    width: '50',
    align: 'cetner'
  }
  columnDefaultSelection = {
    type: 'selection',
    width: '50',
    align: 'center'
  }
  columnDefaultNormal = {
    align: 'left',
    showOverflowTooltip: true
  }
  columnDefaultControl = {
    align: 'center',
    label: '操作',
    fixed: 'right'
  }
  emptyWord = '暂无数据'
  emptyImg = require('./../assets/no-data.png')
  framework = 'cui'
  outerBtnDefault = {
    size: 'samll'
  }
  innerBtnDefault = {
    size: 'samll'
  }
  // 默认配置项结束

  elTable: ElTable
  $refs!: {
    table: ElTable
    tableSearch: TableSearch<D>
  }

  get paginationConfig_() {
    const obj = Object.assign(this.paginationConfigDefault, this.paginationConfig || {})
    if (!this.pageSize) {
      this.pageSize = obj.pageSize
    }
    return obj
  }

  /** 表格内按钮 */
  get innerBtn_() {
    return this.innerBtn
  }
  /** 表格外按钮 */
  get outerBtn_() {
    return this.outerBtn
  }

  @Watch('config', { deep: true, immediate: true })
  onConfigChange() {
    const config = Object.assign(this.configDefault, cloneDeep(this.config))
    // 处理表格中每一项的值的显示
    columnsHandler(config)
    this.config_ = config
  }
  created() {
    this.defaultOptions = (this as any).MlTable
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
  }
  mounted() {
    // 初始化的时候，是否直接搜索数据
    if (this.config_.initSearch === true) {
      this.search('init')
    }
    this.elTable = this.$refs.table
    // this.$nextTick(() => (this.elTable = this.$refs.table))
  }

  // 内部处理删除逻辑
  async onDelete(data: D[], type?: string) {
    if (!data || data.length === 0) {
      this.$message.warning('请选择要删除的内容')
      return
    }
    if (this.config_.api?.delete) {
      const ids = data.map(_ => _[this.config_.tableKey]).join(',')
      try {
        await this.$confirm('此操作将永久删除该数据, 是否继续?')
        await this.config_.api?.delete(ids, data)
        this.refresh()
        this.$message.success('删除成功')
        this.$emit('delete-success', ids, data)
      } catch (error) {
        console.log(error)
        this.$emit('delete-error', ids, data)
      }
    } else {
      if (type === 'inner') {
        this.$emit(type, data[0])
      } else {
        this.$emit(type, this.multipleSelection)
      }
    }
  }
  // 表格内部按钮点击处理
  handleInnerBtn(type: string, index: number, row: D) {
    switch (type) {
      case 'mldelete':
        this.onDelete([row], 'inner')
        break
      default:
        this.$emit(type, row)
        break
    }
  }
  // 表格外按钮点击处理
  handleOuterBtn(type: string) {
    switch (type) {
      case 'mldelete':
        this.onDelete(this.multipleSelection)
        break
      default:
        this.$emit(type, this.multipleSelection)
        break
    }
  }
  // 按钮显示、可用判断
  showJudgeInner(btn: MlTableInnerBtn<D>, row: D): boolean {
    if (btn.showJudge) {
      if (typeof btn.showJudge === 'function') {
        return btn.showJudge(row)
      }
      return getJudge(btn.showJudge, row)
    }
    return true
  }

  // 获取选择的项
  handleSelectionChange(val: D[]) {
    this.multipleSelection = val
  }

  // 刷新表格数据
  refresh() {
    this.search('refresh')
  }

  // 重置查询条件并搜索
  @Provide()
  onReset(data: AnyObj = {}) {
    this.resetSort()
    this.resetPageNum()
    this.search('reset', data || {})
  }
  @Provide()
  onSearch(data: AnyObj = {}) {
    this.resetPageNum()
    this.search('searchBtn', data || {})
  }
  // 重置排序相关
  resetSort() {
    this.elTable?.clearSort()
    this.forceUpdateTableHeader()
    this.sortProp = ''
    this.sortType = ''
  }
  // 如果是由搜索/重置按钮触发的,重置分页相关参数
  resetPageNum() {
    // this.pageSize = 10
    this.currentPage = 1
  }

  // 分页改变
  handleSizeChange(val: number) {
    this.pageSize = val
    this.search('size-change')
    this.$emit('size-change', val)
  }
  handleCurrentChange(val: number) {
    this.currentPage = val
    this.search('current-change')
    this.$emit('current-change', val)
  }
  // 排序
  onSortChange({ column, prop, order }: { column: MlTableColumn<D>; prop: string; order: string }) {
    // const column = this.config_.columns.find(item => item.prop === prop)
    if (column?.sortable === 'custom') {
      this.sortProp = prop
      this.sortType = { descending: 'DESC', ascending: 'ASC' }[order] || '' // ACS 顺序，从小到大， DESC倒序，从大到小
      this.search('sort')
    }
  }

  // 刷新头部状态
  forceUpdateTableHeader() {
    ;(this.$refs?.table?.$refs?.tableHeader as Vue)?.$forceUpdate()
  }

  // 搜索
  async search(type = '', data: AnyObj = {}) {
    if (!this.config_.api || !this.config_.api.list) {
      return
    }
    // expand-row-keys
    this.loading = true
    this.data = []
    const pager: TableParams = this.config_.showPagination ? { pageSize: this.pageSize, pageNum: this.currentPage } : {}
    let params = {
      ...pager,
      ...this.searchData,
      ...this.searchInput,
      ...data
    }
    if (this.sortProp && this.sortType) {
      params.sortColumn = this.sortProp
      params.sortAsc = this.sortType === 'ASC' ? true : false
    }

    if (this.beforeGetList) {
      params = this.beforeGetList(type, params) || params
    }
    let res
    try {
      res = await this.config_.api.list(params)
      this.total = Number(res.total) || 0
      this.data = res?.content || []
      if (this.data.length === 0 && this.currentPage > (Math.ceil(this.total / this.pageSize) || 1)) {
        this.currentPage = 1
        this.search('errorPage-reset')
      }
    } catch (error) {
      console.error(error)
      res = error
    }
    if (type === 'sort') {
      this.forceUpdateTableHeader()
    }
    this.loading = false
    if (this.afterGetList) {
      this.afterGetList(type, res)
    }
  }

  // 搜索表单
  renderSearch() {
    return this.$scopedSlots.search ? (
      this.$scopedSlots.search({ search: this.onSearch, reset: this.onReset })
    ) : (
      <TableSearch
        ref="tableSearch"
        framework={this.framework}
        v-model={this.searchInput}
        onSearch={this.onSearch}
        onReset={this.onReset}
        {...{ props: this.searchConfig }}
      />
    )
  }
  // 外部按钮
  renderOuerBtn(h: CreateElement) {
    if (!this.outerBtn_ || this.outerBtn_.length === 0) {
      return
    }
    const { TagButton } = this.tags
    return (
      <div class="outer-btn-box">
        {this.outerBtn_
          .filter(btn => (btn.showJudge ? btn.showJudge(this.data) : true))
          .map((btn, index) => {
            if (btn.render) {
              return btn.render(h)
            }
            return (
              <TagButton
                class="outer-btn"
                key={index}
                {...{ attrs: { ...this.outerBtnDefault, ...btn } }}
                disabled={
                  (btn.selection === 'single' && this.multipleSelection.length !== 1) ||
                  (btn.selection === 'multiple' && this.multipleSelection.length < 1)
                }
                onClick={() => this.handleOuterBtn(btn.evtType)}
              >
                {btn.Elicon && <i class={['el-icon-' + btn.Elicon]} />}
                {btn.icon && <svg-icon icon-class={btn.icon} />}
                {btn.name}
              </TagButton>
            )
          })}
      </div>
    )
  }
  renderInnerBtn(h: CreateElement) {
    if (!this.innerBtn_ || this.innerBtn_.length === 0) {
      return
    }
    const { TagTableColumn, TagButton } = this.tags
    return (
      <TagTableColumn
        {...{ attrs: this.columnDefaultControl }}
        width={this.config_.tableOptWidth}
        scopedSlots={{
          default: (scope: any) =>
            this.innerBtn_
              .filter(btn => this.showJudgeInner(btn, scope.row))
              .map((btn, index) => {
                if (btn.render) {
                  return btn.render(h, scope)
                }
                return (
                  //     <!-- <c-tooltip v-for="(btn, index) in innerBtnGroup" :key="index" :content="btn.name" effect="dark" placement="top"> -->
                  <TagButton
                    key={index}
                    {...{ attrs: { ...this.innerBtnDefault, ...btn } }}
                    class="inner-btn"
                    onClick={() => this.handleInnerBtn(btn.evtType, scope.$index, scope.row)}
                  >
                    {btn.Elicon && <i class={['el-icon-' + btn.Elicon]} />}
                    {btn.icon && <svg-icon icon-class={btn.icon} />}
                    {btn.name}
                  </TagButton>
                )
              })
        }}
      ></TagTableColumn>
    )
  }
  renderColumn(h: CreateElement) {
    const { TagTableColumn } = this.tags
    return this.config_.columns.map((item, index) => {
      if (item.type === 'index' || item.type === 'selection') {
        return <TagTableColumn align="center" {...{ props: item }} />
      }
      if (item.renderColumn) {
        return item.renderColumn(h)
      }
      return (
        <TagTableColumn
          key={index}
          {...{ props: { ...this.columnDefaultNormal, ...item } }}
          scopedSlots={{
            default: (scope: any) =>
              item.render ? (
                item.render(h, { column: item, row: scope.row, index: scope.$index })
              ) : (
                <span class="td-text">{scope.row[item.prop]}</span>
              )
          }}
        />
      )
    })
  }

  renderTableSlot() {
    const empty = [
      (
        <div class="ml-table-empty" slot="empty">
          <img src={this.emptyImg} class="ml-table-empty-img" />
          <div>{this.emptyWord}</div>
        </div>
      ) as VNode
    ]

    const slots: { [key: string]: VNode[] | undefined } = { empty, ...this.$slots }
    if (slots.default) {
      delete slots.default
    }

    const ary: VNode[] = []
    for (const key in slots) {
      ary.push(<template slot={key}>{slots[key]}</template>)
    }
    return ary.map(item => item)
  }

  //   <!-- 表格内容 -->
  renderTable(h: CreateElement) {
    const tableNodeData = webpackMerge(
      {
        attrs: this.TableDefault
      },
      this.config_.nodeData,
      {
        directives: [{ name: 'loading', value: this.loading }],
        on: {
          'sort-change': this.onSortChange,
          'selection-change': this.handleSelectionChange
        }
      },
      {
        on: this.$listeners,
        attrs: this.$attrs
      }
    )

    const { TagTable, TagTableColumn } = this.tags
    return (
      <TagTable ref="table" data={this.data} row-key={this.config_.tableKey} {...tableNodeData}>
        {this.config_.selection && (
          <TagTableColumn
            {...{ props: this.columnDefaultSelection }}
            reserve-selection={this.config_.reserveSelection}
          />
        )}
        {this.config_.index && <TagTableColumn {...{ props: this.columnDefaultIndex }} />}
        {this.renderColumn(h)}
        {this.renderInnerBtn(h)}
        {this.renderTableSlot()}
      </TagTable>
    )
  }
  //   <!-- 分页 -->
  renderPagination() {
    if (!this.config_.showPagination) {
      return
    }
    const { TagPagination } = this.tags
    return (
      <TagPagination
        current-page={this.currentPage}
        total={this.total}
        class="ml-table-pagination"
        {...{
          props: this.paginationConfig_,
          on: { 'size-change': this.handleSizeChange, 'current-change': this.handleCurrentChange }
        }}
      />
    )
  }

  protected render(h: CreateElement) {
    return (
      <div class="ml-table">
        {this.renderSearch()}
        {this.renderOuerBtn(h)}
        {this.$slots.default}
        {this.renderTable(h)}
        {this.renderPagination()}
      </div>
    )
  }
}
