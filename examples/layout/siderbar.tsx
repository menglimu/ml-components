import Vue, { CreateElement } from 'vue';
import { constantRouterMap } from './../router';
import style from './index.module.scss';

export default Vue.extend({
  name: 'Sidebar',
  methods: {
    onSelect() {
      // console.log("click", index, indexPath)
    },
    renderMenu(subMenu): any {
      const children = subMenu.children || [];
      if (children.length) {
        if (subMenu.hidden) {
          return children.map(item => {
            return this.renderMenu(item);
          });
        }
        return (
          <el-submenu index={subMenu.path}>
            <template slot="title">
              {subMenu.icon && <svg-icon class="menu_icon" icon-class={subMenu.icon} />}
              <span>{subMenu.text}</span>
            </template>
            {children.map(item => {
              return this.renderMenu(item);
            })}
          </el-submenu>
        );
      } else {
        if (subMenu.hidden) {
          return;
        }
        return (
          <el-menu-item index={subMenu.path} class="submenu-title-noDropdown">
            <template slot="title">
              {subMenu.icon && <svg-icon class="menu_icon" icon-class={subMenu.icon} />}
              <span>{subMenu.text}</span>
            </template>
          </el-menu-item>
        );
      }
    }
  },

  render(h: CreateElement) {
    return (
      <div class={style.sidebar}>
        <div class="sidebar-header">
          <h1 class={style.sysName}>组件示例</h1>
        </div>
        <el-menu router mode="vertical" unique-opened default-active={this.$route.name}>
          {constantRouterMap.map(this.renderMenu)}
        </el-menu>
      </div>
    );
  }
});
