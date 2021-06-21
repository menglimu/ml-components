
import Vue from 'vue'
import { CreateElement } from 'vue'
import { constantRouterMap, MlRouterConfig } from './../router'


export default Vue.extend( {
  name: 'Sidebar',
  methods: {
    onSelect() {
    // console.log("click", index, indexPath)
    },r(h: CreateElement, subMenu: MlRouterConfig): any {
    const children = subMenu.children
    if (children && children.length) {
      if (subMenu.hidden) {
        return children.map(item => {
          return this.r(h, item)
        })
      }
      return (
        <c-submenu index={subMenu.path}>
          <template slot="title">
            {subMenu.icon && <svg-icon class="menu_icon" icon-class={subMenu.icon} />}
            <span>{subMenu.text}</span>
          </template>
          {children.map(item => {
            return this.r(h, item)
          })}
        </c-submenu>
      )
    } else {
      if (subMenu.hidden) {
        return
      }
      return (
        <c-menu-item index={subMenu.path} class="submenu-title-noDropdown">
          <template slot="title">
            {subMenu.icon && <svg-icon class="menu_icon" icon-class={subMenu.icon} />}
            <span>{subMenu.text}</span>
          </template>
        </c-menu-item>
      )
    }
  }
  },
  
  render(h: CreateElement) {
    return (
      <div class="sidebar">
        <div class="sidebar-header">
          <h1 class="sys-name">组件示例</h1>
        </div>
        <c-menu router mode="vertical" unique-opened default-active={this.$route.name}>
          {constantRouterMap.map(item => this.r(h, item))}
        </c-menu>
      </div>
    )
  }
})
