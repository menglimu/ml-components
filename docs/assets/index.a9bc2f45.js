import{V as e}from"./vendor.f89eadf5.js";import{c as a}from"./index.35956c39.js";var n={layout:"_layout_jnlvl_1",layoutHeader:"_layoutHeader_jnlvl_6",container:"_container_jnlvl_9",siderbar:"_siderbar_jnlvl_14",sysName:"_sysName_jnlvl_20",page:"_page_jnlvl_25"},t=e.extend({name:"Sidebar",methods:{onSelect(){},renderMenu(e){const a=this.$createElement,n=e.children||[];return n.length?e.hidden?n.map((e=>this.renderMenu(e))):a("el-submenu",{attrs:{index:e.path}},[a("template",{slot:"title"},[e.icon&&a("svg-icon",{class:"menu_icon",attrs:{"icon-class":e.icon}}),a("span",[e.text])]),n.map((e=>this.renderMenu(e)))]):e.hidden?void 0:a("el-menu-item",{attrs:{index:e.path},class:"submenu-title-noDropdown"},[a("template",{slot:"title"},[e.icon&&a("svg-icon",{class:"menu_icon",attrs:{"icon-class":e.icon}}),a("span",[e.text])])])}},render(e){return e("div",{class:n.sidebar},[e("div",{class:"sidebar-header"},[e("h1",{class:n.sysName},["组件示例"])]),e("el-menu",{attrs:{router:!0,mode:"vertical","unique-opened":!0,"default-active":this.$route.name}},[a.map(this.renderMenu)])])}}),s=e.extend({name:"Layout",components:{siderbar:t},render(){const e=arguments[0];return e("div",{class:n.layout},[e("header",{class:n.layoutHeader}),e("div",{class:[n.container,"container-page"]},[e(t,{class:n.siderbar}),e("router-view",{class:[n.page]})])])}});export default s;
