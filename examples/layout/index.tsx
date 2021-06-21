
import Vue from 'vue'
import siderbar from './siderbar.vue'

export default Vue.extend({
  name: 'Layout',
  components: { siderbar },
  render() {
    return (
      <div class="layout">
        <header class="layout-header" />
        <div class="container">
          <siderbar class="container-siderbar" />
          <router-view class="container-page" />
        </div>
      </div>
    )
  }
}) 
