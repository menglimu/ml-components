/**
 * 滚动分页组件
 */

import style from 'index.module.scss';
import Vue from 'vue';

export default Vue.extend({
  name: 'InfiniteScrollPage',
  props: {
    page: { type: Number, default: 0 },
    size: { type: Number, default: 10 },
    data: { type: Array, default: [] },
    getList: { type: Function, default: null },
    initSearch: { default: true }
  },
  data() {
    return {
      pageNum: 0,
      pageSize: 10,
      dataList: [],
      isAll: false,
      loading: false
    };
  },
  watch: {
    data() {}
  },
  created() {
    this.$watch('data', () => {
      this.dataList = this.data;
    });
    this.pageNum = this.page;
    this.pageSize = this.size;
    this.dataList = this.data;
    this.initSearch && this.load();
  },
  methods: {
    async load() {
      this.$emit('load');
      if (!this.getList || this.isAll || this.loading) {
        return;
      }
      this.loading = true;
      this.pageNum++;
      let data = [];
      try {
        data = await this.getList({ pageNum: this.pageNum, pageSize: this.pageSize });
        if (Array.isArray(data)) {
          this.dataList.push(...data);
        } else {
          console.log('后台返回的数据不是数组形式');
        }
      } catch (error) {
        console.log(error);
        this.pageNum--;
      }
      if (data.length < this.pageSize) {
        this.isAll = true;
      }
      this.loading = false;
    },
    async refresh() {
      if (!this.getList) return;
      this.pageNum = 0;
      this.dataList = [];
      this.isAll = false;
      await this.load();
    }
  },
  render() {
    return (
      <div
        class={style.infiniteScrollPage}
        v-loading={this.loading}
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
      >
        <div v-infinite-scroll={this.load} class={style.list}>
          {this.dataList.map(item => this.$scopedSlots?.default?.(item))}
        </div>
        {!this.loading && (!this.dataList || this.dataList.length === 0) && (
          <div class={style.noData}>暂无相关数据</div>
        )}
      </div>
    );
  }
});
