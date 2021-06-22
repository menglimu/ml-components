import Vue from 'vue';
import router from './router';
import mlComponents from '@/packages';
import App from './App.vue';
import MdDemo from './md-demo-src.vue';

Vue.use(mlComponents);
Vue.component('MdDemo', MdDemo);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
