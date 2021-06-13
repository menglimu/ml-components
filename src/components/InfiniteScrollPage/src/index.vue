<script lang="tsx">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'InfiniteScrollPage',
  props: {
    page: null,
    size: null,
    data: null,
    getList: null,
    initSearch: {
      default: true
    }
  },
  data() {
    return {
      pageNum: 0,
      pageSize: 10,
      dataList: [],
      isAll: false,
      loading: false
    }
  },
  created() {
    this.pageNum = this.page || 0
    this.pageSize = this.size || 10
    this.dataList = this.data || []
    this.initSearch && this.load()
  },
  watch: {
    data() {
      this.dataList = this.data || []
    }
  },
  methods: {
    async load() {
      this.$emit('load')
      if (!this.getList || this.isAll || this.loading) {
        return
      }
      this.loading = true
      this.pageNum++
      let data = []
      try {
        data = await this.getList({ pageNum: this.pageNum, pageSize: this.pageSize })
        if (Array.isArray(data)) {
          this.dataList.push(...data)
        } else {
          console.log('后台返回的数据不是数组形式')
        }
      } catch (error) {
        console.log(error)
        this.pageNum--
      }
      if (data.length < this.pageSize) {
        this.isAll = true
      }
      this.loading = false
    },
    async refresh() {
      if (!this.getList) return
      this.pageNum = 0
      this.dataList = []
      this.isAll = false
      await this.load()
    }
  },
  render() {
    return (
      <div
        class='InfiniteScrollPage'
        v-loading={this.loading}
        element-loading-text='数据加载中'
        element-loading-spinner='el-icon-loading'
        element-loading-background='rgba(0, 0, 0, 0.4)'>
        <div v-infinite-scroll={this.load} class='InfiniteScrollPage-list'>
          {this.dataList.map(item => this.$scopedSlots?.default?.(item))}
        </div>
        {!this.loading && (!this.dataList || this.dataList.length === 0) && <div class='no-data'>暂无相关数据</div>}
      </div>
    )
  }
})
</script>
<style lang="scss" scoped>
.InfiniteScrollPage {
  padding: 0;
  margin: 0;
  position: relative;
  &-list {
    height: 100%;
    overflow: auto;
  }
  .no-data {
    color: #fff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
