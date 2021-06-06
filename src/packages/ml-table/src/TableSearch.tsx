import { Component, Vue, Prop } from 'vue-property-decorator'
import { MlFormConfig, MlForm } from '@cci/ml-form/types'
import preventReClick from '@/directives/preventReClick'
import { TableSearchProp } from 'types/table'

@Component({
  components: {},
  directives: {
    preventReClick
  }
})
export default class TableSearch<D> extends Vue implements TableSearchProp<D> {
  @Prop({ type: Boolean, default: true }) isBtnInForm?: boolean // 搜索和重置按钮在输入项后显示，！输入项不能占满元素
  @Prop({ type: Boolean, default: false }) isOverHide?: boolean // 超过一行隐藏
  @Prop({ type: Object }) config?: MlFormConfig<D> // 搜索表单配置

  @Prop({ type: String, default: 'button' }) hideUIType?: 'button' | 'bottom' // 底部隐藏的按钮的样式

  @Prop({ type: Object, required: true }) value: AnyObj

  @Prop({ type: String, default: 'cui' }) framework?: 'cui' | 'element-ui'

  $refs: {
    searchForm: MlForm
  }

  showMoreStatus = false

  created() {
    if (this.isOverHide) {
      this.showMoreStatus = true
    }
  }

  getSize() {
    return this.config.size || (this.$refs.searchForm && (this.$refs.searchForm as any).config_.size) || ''
  }

  reset() {
    this.$refs.searchForm && this.$refs.searchForm.reset()
  }

  onChangeHideStatus() {
    this.showMoreStatus = !this.showMoreStatus
  }

  onSubmit(e: KeyboardEvent) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  onKeyup(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.onSearch_()
    }
  }

  async onSearch_() {
    // 存在搜索项，先校验表单加载完全和表单验证
    try {
      await this.$refs.searchForm.validate()
    } catch (error) {
      return
    }
    this.$emit('search')
  }

  onReset_() {
    this.$refs.searchForm.reset()
    this.$emit('reset')
  }

  // <!-- 搜索表单 -->
  protected render() {
    if (!this.config || !this.config.columns || this.config.columns.length === 0) {
      return
    }

    const size = this.getSize()
    const TagButton = { cui: 'c-button', 'element-ui': 'el-button' }[this.framework]
    const btn = (
      <div class="search-btn-box">
        <TagButton
          type="primary"
          class="search"
          size={size}
          onClick={this.onSearch_}
          v-preventReClick>
          查询
        </TagButton>
        <TagButton class="reset" size={size} onClick={this.onReset_}>
          重置
        </TagButton>
        {this.isOverHide && this.hideUIType === 'button' && (
          <TagButton onClick={this.onChangeHideStatus} size={size}>
            {this.showMoreStatus ? <i class="el-icon-arrow-down" /> : <i class="el-icon-arrow-up" />}
          </TagButton>
        )}
      </div>
    )

    // v-preventReClick
    return (
      <div
        class={[
          'ml-table-search',
          'label-' + this.config.labelPosition,
          {
            'hide-more': this.showMoreStatus,
            'btn-in-form': this.isBtnInForm
          }
        ]}>
        <div class="search-form-box">
          <ml-form
            nativeOn-keyup={this.onKeyup}
            nativeOn-submit={this.onSubmit}
            ref="searchForm"
            value={this.value}
            // onInput={(e: any) => this.$emit('input', e)}
            {...{ on: this.$listeners }}
            config={this.config}
            class="search-form">
            {this.isBtnInForm && !(this.isOverHide && this.showMoreStatus) && btn}
          </ml-form>
          {this.isOverHide && this.hideUIType === 'bottom' && (
            <div class="more" onClick={this.onChangeHideStatus}>
              {this.showMoreStatus ? <i class="el-icon-caret-bottom" /> : <i class="el-icon-caret-top" />}
              {this.showMoreStatus ? '展开更多' : '收起查询'}
            </div>
          )}
        </div>
        {(!this.isBtnInForm || (this.isOverHide && this.showMoreStatus)) && btn}
      </div>
    )
  }
}
