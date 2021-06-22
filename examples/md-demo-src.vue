<!--
 * @Author: wenlin
 * @Date: 2021-01-10 10:15:22
 * @LastEditors: wenlin
 * @LastEditTime: 2021-01-10 21:51:46
 * @Description:  
-->
<script lang="tsx">
import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default Vue.extend({
  props: {
    path: { type: String, required: true }
  },
  data() {
    return {
      showSource: false,

      isFixed: false,
      btnWidth: 300,

      source: '',

      container: null
    };
  },

  created() {
    let res = import.meta.glob(`./views/${this.path}.tsx?raw`);
    Object.values(res)[0]().then(res => {
      this.source = hljs.highlight(res.default, { language: 'javascript' }).value;
    });
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
        <div class="pre-code-view">{this.$slots.default ? this.$slots.default : this.path && <this.path />}</div>
        <div class="pre-code-source">
          <pre class="source-box" ref="sourceDom" v-show={this.showSource} domPropsInnerHTML={this.source} />
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
</script>
<style lang="scss">
.pre-code {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  .source-box {
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
  }

  &-view {
    padding: 24px;
  }

  &-source {
    &-showbtn {
      &.is-fixed {
        position: fixed;
        bottom: 0;
        z-index: 100;
      }

      display: block;
      width: 100%;
      color: #d3dce6;
      text-align: center;
      cursor: pointer;
      border: 0;
      border-top: 1px solid #eaeefb;

      &-text {
        display: none;
        padding-left: 5px;
      }
    }
  }

  &:hover {
    color: #409eff;

    .pre-code-source-showbtn-text {
      display: inline;
    }
  }

  pre {
    margin: 0 auto;
  }
}
</style>
