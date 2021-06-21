import Vue from 'vue';
import router from './router';
import mlComponents from '@/packages';
import App from './App.vue';

Vue.use(mlComponents);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
