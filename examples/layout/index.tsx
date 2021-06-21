import Vue from 'vue';
import siderbar from './siderbar';
import style from './index.module.scss';

export default Vue.extend({
  name: 'Layout',
  components: { siderbar },
  render() {
    return (
      <div class={style.layout}>
        <header class={style.layoutHeader} />
        <div class={[style.container, 'container-page']}>
          <siderbar class={style.sidebar} />
          <router-view class={[style.page]} />
        </div>
      </div>
    );
  }
});
