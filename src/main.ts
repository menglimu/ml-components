import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

import test from './components/test'

new Vue(test).$mount('#app') 