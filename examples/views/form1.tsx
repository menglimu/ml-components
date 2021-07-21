import Vue from 'vue';
import FormBase from './../components/FormDemo/FormBase';

export const title = '快速上手'; // 左侧自动导入时，菜单的名称
export const sort = 200; // 菜单的排序
export default Vue.extend({
  data() {
    return {
      value: null,
      source: ''
    };
  },
  created() {
    import(`./../components/FormDemo/FormBase.tsx?raw`).then(res => {
      this.source = res.default;
    });
  },
  render() {
    return (
      <div>
        <h3>表单基础使用</h3>
        <p>基础的表单，包含异步数据源，校验等</p>
        <base-source-view source={this.source}>
          <FormBase />
        </base-source-view>
      </div>
    );
  }
});
