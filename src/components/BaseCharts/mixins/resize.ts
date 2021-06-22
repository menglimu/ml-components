import { debounce } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      sidebarElm: null,
      resizeHandler: null,
      chart: null
    };
  },
  mounted() {
    this.resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', this.resizeHandler);

    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm?.addEventListener('transitionend', this.sidebarResizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
    this.sidebarElm?.removeEventListener('transitionend', this.sidebarResizeHandler);
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.resizeHandler();
      }
    }
  }
});
