import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './index.scss';
// views下面的所有源码
export default Vue.extend({
  props: {
    source: { type: String, required: true },
    component: { type: String, required: true }
  },
  data() {
    return {
      showSource: false,

      isFixed: false,
      btnWidth: 300,

      sourceHighLight: '',

      container: null
    };
  },

  created() {
    // const files = import.meta.globEager('./views/*.tsx?raw') as any;
    // console.log(files,23547587);
    // import(`./../../views/${this.path}.tsx?raw`).then(res => {
    //   this.source = hljs.highlight(res.default, { language: 'javascript' }).value;
    // });
    this.sourceHighLight = hljs.highlight(this.source, { language: 'javascript' }).value;
    // let sources = import.meta.glob(`./../../views/${this.path}.tsx?raw`);
    // console.log(`./views/`, sources);
    // Object.values(res)[0]().then(res => {
    //   this.source = hljs.highlight(res.default, { language: 'javascript' }).value;
    // });
    // const bb = require(`!!text-loader!./components/form.vue`)
    // console.log(bb)
    // this.source = require(`!!text-loader!./components/${this.path}`);
  },

  mounted() {
    document.querySelector('.container-page').addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    document.querySelector('.container-page').removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.$nextTick(() => {
        let sourceDom: any = this.$refs.sourceDom;
        if (!sourceDom) {
          return;
        }
        const sourcePre: HTMLElement = sourceDom; // this.$el.querySelector(`#${this.id} .pre-code-source`)
        const container = document.querySelector('.container-page');

        this.btnWidth = sourcePre.clientWidth;
        // 当底部在屏幕下&&顶部在屏幕内时
        if (
          sourcePre.offsetTop + sourcePre.clientHeight > container.scrollTop + container.clientHeight &&
          sourcePre.offsetTop < container.scrollTop + container.clientHeight
        ) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      });
    },

    onSwitchShow() {
      this.showSource = !this.showSource;
      this.onScroll();
    }
  },

  render() {
    return (
      <div class="pre-code">
        <div class="pre-code-view">
          {this.$slots.default ? this.$slots.default : this.component && <this.component />}
        </div>
        <div class="pre-code-source">
          <pre class="source-box" ref="sourceDom" v-show={this.showSource} domPropsInnerHTML={this.sourceHighLight} />
          <el-button
            class={{ 'is-fixed': this.isFixed, 'pre-code-source-showbtn': true }}
            style={{ width: this.isFixed ? this.btnWidth + 'px' : '100%' }}
            onClick={this.onSwitchShow}
          >
            <i class={[this.showSource ? 'el-icon-caret-top' : 'el-icon-caret-bottom']}></i>
            <span class="pre-code-source-showbtn-text">{this.showSource ? '隐藏源码' : '显示源码'}</span>
          </el-button>

          {/** <highlightjs language='javascript' code="var x = 5;" /> */}
        </div>
      </div>
    );
  }
});
