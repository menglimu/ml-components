import Vue from 'vue';
import router from './router';
import mlComponents from '@/main';
import App from './App.vue';
import MdDemo from './components/MdDemo';

Vue.use(mlComponents);
Vue.component('MdDemo', MdDemo);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
