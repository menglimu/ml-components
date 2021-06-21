import Vue from 'vue'
import mlComponents from './packages'
Vue.use(mlComponents)
import Test from '@/views/test'
new Vue(Test).$mount('#app')
