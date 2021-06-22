/**
 * 基础EChart组件
 */

import * as echarts from 'echarts';

import resize from './mixins/resize';
import merge from '@/utils/merge';
import style from './index.module.scss';

export default resize.extend({
  name: 'BaseChart',
  mixins: [resize],
  props: {
    option: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      defaultOption: {
        color: ['#009dff', '#11c372', '#ffa542', '#ff4f5c'],
        title: {
          textStyle: {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 'normal'
          },
          textAlign: 'left'
        },
        legend: {
          textStyle: {
            color: 'rgba(255,255,255,0.65)'
          },
          bottom: 10,
          left: 45
        },
        tooltip: {},
        grid: {
          right: 24,
          left: 50,
          top: 40
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#cccccc'
            }
          }
        },
        yAxis: {
          axisLabel: {
            color: 'rgba(255,255,255,0.65)'
          },
          splitLine: {
            lineStyle: {
              color: ['#d7d7d7'],
              type: 'dashed'
            }
          }
        }
      }
    };
  },
  watch: {
    'option.series': {
      deep: true,
      handler(this: any) {
        this.$nextTick(this.setOption);
      }
    },
    'option.xAxis': {
      deep: true,
      handler(this: any) {
        this.$nextTick(this.setOption);
      }
    },
    'option.dataset': {
      deep: true,
      handler(this: any) {
        this.$nextTick(this.setOption);
      }
    }
  },
  mounted() {
    if (this.option) {
      this.initChart();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    merge,
    initChart() {
      this.chart = echarts.init(this.$el as HTMLElement);
      this.setOption();
    },
    setOption() {
      const mergeOption = this.merge(this.defaultOption, this.option);
      this.chart.setOption(mergeOption);
    }
  },
  render() {
    return <div class={style.charts}></div>;
  }
});
