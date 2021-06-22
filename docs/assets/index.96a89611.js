var t=Object.defineProperty,e=Object.defineProperties,i=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=(e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s,a=(t,e)=>{for(var i in e||(e={}))o.call(e,i)&&r(t,i,e[i]);if(s)for(var i of s(e))n.call(e,i)&&r(t,i,e[i]);return t},l=(t,s)=>e(t,i(s));import{V as h,h as c,G as u,a as p,l as d}from"./vendor.b786a73e.js";let f;window.Vue=h;const g={};var m=h.extend({name:"CustomCascader",props:{options:{type:Array,required:!0},optionLabel:{type:String,default:"label"},optionValue:{type:String,default:"value"},value:{type:String,default:""},props:{type:Object,default:()=>({})}},computed:{propsObj(){return a({checkStrictly:!0,expandTrigger:"hover",emitPath:!1,value:this.optionValue,label:this.optionLabel},this.props)}},methods:{computedProps(){return a({checkStrictly:!0,expandTrigger:"hover",emitPath:!1,value:this.optionValue,label:this.optionLabel},this.props)},onClick(t){this.$emit("input",t);this.$refs.cascader.toggleDropDownVisible(!1)},onInput(t){this.$emit("input",t)}},render(){const t=arguments[0];return t("el-cascader",c([{ref:"cascader",class:"custom-cascader",attrs:{"popper-class":"custom-cascader-popper",value:this.value,options:this.options},on:{input:this.onInput}},{props:l(a({},this.$attrs),{props:this.propsObj})},{scopedSlots:{default:({data:e})=>t("div",{on:{click:()=>this.onClick(e[this.propsObj.value])}},[e[this.propsObj.label]])}}]))}});var b=h.extend({data:()=>({value:null,formConfig:null,formValue:{}}),created(){this.formConfig={columns:[{label:"名字",prop:"name"}]}},render(){const t=arguments[0];return t("div",[t(m,{attrs:{options:[]},model:{value:this.value,callback:t=>{this.value=t}}}),t("ml-form",{attrs:{config:this.formConfig},model:{value:this.formValue,callback:t=>{this.formValue=t}}})])}}),y=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",title:"快速上手",sort:2e3,default:b});var v=h.extend({name:"Index",data:()=>({}),methods:{},render(){const t=arguments[0];return t("div",[t("h3",["项目简介"]),"基于element，对form和table进行二次封装。进行统一的"])}}),_=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",title:"项目简介",sort:1e3,isMd:!0,default:v}),w=h.extend({props:{path:{type:String,required:!0}},data:()=>({showSource:!1,isFixed:!1,btnWidth:300,source:"",container:null}),created(){Object.values({})[0]().then((t=>{this.source=u.highlight(t.default,{language:"javascript"}).value}))},mounted(){document.querySelector(".container-page").addEventListener("scroll",this.onScroll)},beforeDestroy(){document.querySelector(".container-page").removeEventListener("scroll",this.onScroll)},methods:{onScroll(){this.$nextTick((()=>{let t=this.$refs.sourceDom;if(!t)return;const e=t,i=document.querySelector(".container-page");this.btnWidth=e.clientWidth,e.offsetTop+e.clientHeight>i.scrollTop+i.clientHeight&&e.offsetTop<i.scrollTop+i.clientHeight?this.isFixed=!0:this.isFixed=!1}))},onSwitchShow(){this.showSource=!this.showSource,this.onScroll()}},render(){const t=arguments[0];return t("div",{class:"pre-code"},[t("div",{class:"pre-code-view"},[this.$slots.default?this.$slots.default:this.path&&t(this.path)]),t("div",{class:"pre-code-source"},[t("pre",{class:"source-box",ref:"sourceDom",directives:[{name:"show",value:this.showSource}],domProps:{innerHTML:this.source}}),t("el-button",{class:{"is-fixed":this.isFixed,"pre-code-source-showbtn":!0},style:{width:this.isFixed?this.btnWidth+"px":"100%"},on:{click:this.onSwitchShow}},[t("i",{class:[this.showSource?"el-icon-caret-top":"el-icon-caret-bottom"]}),t("span",{class:"pre-code-source-showbtn-text"},[this.showSource?"隐藏源码":"显示源码"])])])])}});function S(t,e,i,s,o,n,r,a){var l,h="function"==typeof t?t.options:t;if(e&&(h.render=e,h.staticRenderFns=i,h._compiled=!0),s&&(h.functional=!0),n&&(h._scopeId="data-v-"+n),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},h._ssrRegister=l):o&&(l=a?function(){o.call(this,(h.functional?this.parent:this).$root.$options.shadowRoot)}:o),l)if(h.functional){h._injectStyles=l;var c=h.render;h.render=function(t,e){return l.call(e),c(t,e)}}else{var u=h.beforeCreate;h.beforeCreate=u?[].concat(u,l):[l]}return{exports:t,options:h}}const x={};var T=S(w,undefined,undefined,!1,(function(t){for(let e in x)this[e]=x[e]}),null,null,null);T.options.__file="examples/md-demo-src.vue";var C=T.exports;h.use(p);let O=[];const $={"./views/formbase.tsx":y,"./views/index.tsx":_};Object.keys($).forEach((t=>{var e;const i=null==(e=$[t])?void 0:e.default,s=t.match(/views\/(.*)\.tsx/)[1];h.component(s,i);let o=$[t].title;$[t].isMd?O.push({name:s,path:s,component:i,text:o,sort:$[t].sort||1e5}):O.push({name:s,path:s,component:{render:t=>t(C,{attrs:{path:s}})},text:o,sort:$[t].sort||1e5})}));const D=[{name:"index",path:"/",component:()=>function(t,e){if(!e)return t();if(void 0===f){const t=document.createElement("link").relList;f=t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(e.map((t=>{if(t in g)return;g[t]=!0;const e=t.endsWith(".css"),i=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${i}`))return;const s=document.createElement("link");return s.rel=e?"stylesheet":f,e||(s.as="script",s.crossOrigin=""),s.href=t,document.head.appendChild(s),e?new Promise(((t,e)=>{s.addEventListener("load",t),s.addEventListener("error",e)})):void 0}))).then((()=>t()))}((()=>import("./index.3a4a4c65.js")),["/ml-components/assets/index.3a4a4c65.js","/ml-components/assets/index.1c3d671e.css","/ml-components/assets/vendor.b786a73e.js"]),redirect:"/formbase",children:O.sort(((t,e)=>t.sort-e.sort)),hidden:!0}];var k=new p({scrollBehavior:()=>({x:0,y:0}),routes:D});class V{constructor(t="cui"){this.TagButton="button",this.TagTable="table",this.TagTableColumn="table-column",this.TagPagination="pagination",this.setTags(t)}setTags(t="cui"){const e={cui:"c-","element-ui":"el-"}[t];this.TagButton=e+this.TagButton,this.TagTable=e+this.TagTable,this.TagTableColumn=e+this.TagTableColumn,this.TagPagination=e+this.TagPagination}}function P(t,e){for(const i in t)if(e[i]!==t[i])return!1;return!0}function B(t,e,i="label",s="value",o="children"){let n;for(const r in e){const a=e[r];if(a[s]===t){n=a[i];break}a.children&&(n=B(t,a[o],i,s,o))}return n}function z(t,e){if(!["select","cascader","tree"].includes(e.type)&&!Array.isArray(t))return t;const i=Array.isArray(t)?t:[t];if(["select"].includes(e.type)&&Array.isArray(e.options)){const t=[];return e.options.filter((t=>i.filter((i=>e.optionValue?t[e.optionValue]==i:i==t.value)).length>0)).forEach((i=>{e.optionLabel?t.push(i[e.optionLabel]):t.push(i.label)})),t.join(",")}if("cascader"===e.type){let t=e.options||[],s=null,o=null;for(let n=0;n<i.length;n++){const r=i[n];o=t.find((t=>t[e.optionValue||"value"]==r)),o?(s=o[e.optionLabel||"label"],t=o[e.optionChildren||"children"]||[]):s=""}return s}if(["tree"].includes(e.type)&&Array.isArray(e.options)){if(!Array.isArray(t))return B(t,e.options||[],e.optionLabel||"label",e.optionValue||"value",e.optionChildren||"children");t.map((t=>B(t,e.options||[],e.optionLabel||"label",e.optionValue||"value",e.optionChildren||"children")))}return Array.isArray(t)?t.join(","):t}function j(t,e,i){if("function"==typeof e)return e(i);if(e)for(const s in e)P(e[s],i)&&t.push(s);return t}function I(t){t.columns.forEach((t=>{"function"==typeof t.optionsGet&&(t.options=[],t.optionsGet().then((e=>{Array.isArray(e.content)&&(t.options=e.content)}))),t.render||(t.render=function(t){return"image"===t.type?(e,i)=>{let s=i.row[t.prop];if(s){Array.isArray(s)||(s=[s]),t.baseUrl&&(s=s.map((e=>t.baseUrl+e)));const o=j(["td-img-box"],t.statusJudge,i.row);return e("div",{class:o},[s.map((i=>t.noPre?e("img",{class:"td-img",attrs:{src:i}}):e("el-image",{class:"td-img",attrs:{fit:"cover",src:i,"preview-src-list":s}})))])}return e("span")}:"svg"===t.type?(e,i)=>i.row[t.prop]?e("div",{class:j(["td-svg-box"],t.statusJudge,i.row)},[e("svg-icon",{class:"td-svg",attrs:{"icon-class":i.row[t.prop]}})]):e("span"):(e,i)=>{const s=j(["td-text"],t.statusJudge,i.row);return t.formatter?e("div",{class:s},[t.formatter(i.row,t)]):e("span",{class:s,domProps:{innerHTML:z(i.row[t.prop],i.column)}})}}(t))}))}const E=function(...t){let e=(t,e)=>{if(void 0===e)return d.exports.cloneDeep(t);Array.isArray(t)&&Array.isArray(e)&&d.exports.cloneDeep(e)};return Object.values(t).reverse().reduce(((t,i)=>d.exports.mergeWith(t,i,e)))};var A=h.extend({name:"TableSearch",props:{isBtnInForm:{type:Boolean,default:!0},isOverHide:{type:Boolean,default:!1},config:{type:Object},hideUIType:{type:String,default:"button"},value:{type:Object,required:!0},framework:{type:String,default:"cui"}},data:()=>({showMoreStatus:!1}),created(){this.isOverHide&&(this.showMoreStatus=!0)},methods:{getSize(){return this.config.size||this.$refs.searchForm&&this.$refs.searchForm.config_.size||""},reset(){var t;null==(t=this.$refs.searchForm)||t.reset()},onChangeHideStatus(){this.showMoreStatus=!this.showMoreStatus},onSubmit:t=>(t.preventDefault(),t.stopPropagation(),!1),onKeyup(t){13===t.keyCode&&this.onSearch_()},async onSearch_(){var t;try{await(null==(t=this.$refs.searchForm)?void 0:t.validate())}catch(e){return}this.$emit("search")},onReset_(){var t;null==(t=this.$refs.searchForm)||t.reset(),this.$emit("reset")}},render(){const t=arguments[0];if(!this.config||!this.config.columns||0===this.config.columns.length)return;const e=this.getSize(),i={cui:"c-button","element-ui":"el-button"}[this.framework],s=t("div",{class:"search-btn-box"},[t(i,{attrs:{type:"primary",size:e},class:"search",on:{click:this.onSearch_},directives:[{name:"prevent-re-click",value:!0}]},["查询"]),t(i,{class:"reset",attrs:{size:e},on:{click:this.onReset_}},["重置"]),this.isOverHide&&"button"===this.hideUIType&&t(i,{on:{click:this.onChangeHideStatus},attrs:{size:e}},[this.showMoreStatus?t("i",{class:"el-icon-arrow-down"}):t("i",{class:"el-icon-arrow-up"})])]);return t("div",{class:["ml-table-search","label-"+this.config.labelPosition,{"hide-more":this.showMoreStatus,"btn-in-form":this.isBtnInForm}]},[t("div",{class:"search-form-box"},[t("ml-form",{nativeOn:{keyup:this.onKeyup,submit:this.onSubmit},ref:"searchForm",attrs:{value:this.value,config:this.config},on:a({},this.$listeners),class:"search-form"},[this.isBtnInForm&&!(this.isOverHide&&this.showMoreStatus)&&s]),this.isOverHide&&"bottom"===this.hideUIType&&t("div",{class:"more",on:{click:this.onChangeHideStatus}},[this.showMoreStatus?t("i",{class:"el-icon-caret-bottom"}):t("i",{class:"el-icon-caret-top"}),this.showMoreStatus?"展开更多":"收起查询"])]),(!this.isBtnInForm||this.isOverHide&&this.showMoreStatus)&&s])}}),M=h.extend({name:"MlTable",inheritAttrs:!1,props:{searchConfig:{type:Object,required:!1},config:{type:Object,required:!0},searchData:{type:Object,default:()=>({})},innerBtn:{type:Array,default:()=>[]},outerBtn:{type:Array,default:()=>[]},paginationConfig:{type:Object,default:()=>({})},beforeGetList:{type:Function},afterGetList:{type:Function}},data:()=>({config_:null,data:[],loading:!1,pageSize:0,currentPage:1,total:0,sortProp:"",sortType:"",multipleSelection:[],tags:null,searchInput:{},defaultOptions:null,paginationConfigDefault:{pageSizes:[10,20,30],pageSize:10,background:!0,layout:"total, sizes, prev, pager, next, jumper"},configDefault:{tableKey:"id",showPagination:!0,selection:!0,reserveSelection:!0,initSearch:!0},TableDefault:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},columnDefaultIndex:{type:"index",label:"序号",width:"50",align:"cetner"},columnDefaultSelection:{type:"selection",width:"50",align:"center"},columnDefaultNormal:{align:"left",showOverflowTooltip:!0},columnDefaultControl:{align:"center",label:"操作",fixed:"right"},emptyWord:"暂无数据",emptyImg:"/ml-components/assets/no-data.23b37083.png",framework:"cui",outerBtnDefault:{size:"samll"},innerBtnDefault:{size:"samll"},elTable:null}),computed:{paginationConfig_(){const t=Object.assign(this.paginationConfigDefault,this.paginationConfig||{});return this.pageSize||(this.pageSize=t.pageSize),t},innerBtn_(){return this.innerBtn},outerBtn_(){return this.outerBtn}},created(){if(this.$watch("config",this.onConfigChange,{deep:!0,immediate:!0}),this.defaultOptions=this.MlTable,this.defaultOptions)for(const t in this.defaultOptions)"object"==typeof this.defaultOptions[t]?this[t]=E(this[t],this.defaultOptions[t]):this[t]=this.defaultOptions[t];this.tags=new V(this.framework)},mounted(){!0===this.config_.initSearch&&this.search("init"),this.elTable=this.$refs.table},methods:{onConfigChange(){const t=Object.assign(this.configDefault,d.exports.cloneDeep(this.config));I(t),this.config_=t},async onDelete(t,e){var i,s;if(t&&0!==t.length)if(null==(i=this.config_.api)?void 0:i.delete){const e=t.map((t=>t[this.config_.tableKey])).join(",");try{await this.$confirm("此操作将永久删除该数据, 是否继续?"),await(null==(s=this.config_.api)?void 0:s.delete(e,t)),this.refresh(),this.$message.success("删除成功"),this.$emit("delete-success",e,t)}catch(o){console.log(o),this.$emit("delete-error",e,t)}}else"inner"===e?this.$emit(e,t[0]):this.$emit(e,this.multipleSelection);else this.$message.warning("请选择要删除的内容")},handleInnerBtn(t,e,i){switch(t){case"mldelete":this.onDelete([i],"inner");break;default:this.$emit(t,i)}},handleOuterBtn(t){switch(t){case"mldelete":this.onDelete(this.multipleSelection);break;default:this.$emit(t,this.multipleSelection)}},showJudgeInner:(t,e)=>!t.showJudge||("function"==typeof t.showJudge?t.showJudge(e):P(t.showJudge,e)),handleSelectionChange(t){this.multipleSelection=t},refresh(){this.search("refresh")},onReset(t={}){this.resetSort(),this.resetPageNum(),this.search("reset",t||{})},onSearch(t={}){this.resetPageNum(),this.search("searchBtn",t||{})},resetSort(){var t;null==(t=this.elTable)||t.clearSort(),this.forceUpdateTableHeader(),this.sortProp="",this.sortType=""},resetPageNum(){this.currentPage=1},handleSizeChange(t){this.pageSize=t,this.search("size-change"),this.$emit("size-change",t)},handleCurrentChange(t){this.currentPage=t,this.search("current-change"),this.$emit("current-change",t)},onSortChange({column:t,prop:e,order:i}){"custom"===(null==t?void 0:t.sortable)&&(this.sortProp=e,this.sortType={descending:"DESC",ascending:"ASC"}[i]||"",this.search("sort"))},forceUpdateTableHeader(){var t,e,i,s;null==(s=null==(i=null==(e=null==(t=this.$refs)?void 0:t.table)?void 0:e.$refs)?void 0:i.tableHeader)||s.$forceUpdate()},async search(t="",e={}){if(!this.config_.api||!this.config_.api.list)return;this.loading=!0,this.data=[];const i=this.config_.showPagination?{pageSize:this.pageSize,pageNum:this.currentPage}:{};let s,o=a(a(a(a({},i),this.searchData),this.searchInput),e);this.sortProp&&this.sortType&&(o.sortColumn=this.sortProp,o.sortAsc="ASC"===this.sortType),this.beforeGetList&&(o=this.beforeGetList(t,o)||o);try{s=await this.config_.api.list(o),this.total=Number(s.total)||0,this.data=(null==s?void 0:s.content)||[],0===this.data.length&&this.currentPage>(Math.ceil(this.total/this.pageSize)||1)&&(this.currentPage=1,this.search("errorPage-reset"))}catch(n){console.error(n),s=n}"sort"===t&&this.forceUpdateTableHeader(),this.loading=!1,this.afterGetList&&this.afterGetList(t,s)},renderSearch(){const t=this.$createElement;return this.$scopedSlots.search?this.$scopedSlots.search({search:this.onSearch,reset:this.onReset}):t(A,{ref:"tableSearch",attrs:{framework:this.framework},on:{search:this.onSearch,reset:this.onReset},props:a({},this.searchConfig),model:{value:this.searchInput,callback:t=>{this.searchInput=t}}})},renderOuerBtn(t){if(!this.outerBtn_||0===this.outerBtn_.length)return;const{TagButton:e}=this.tags;return t("div",{class:"outer-btn-box"},[this.outerBtn_.filter((t=>!t.showJudge||t.showJudge(this.data))).map(((i,s)=>i.render?i.render(t):t(e,{class:"outer-btn",key:s,attrs:l(a({},a(a({},this.outerBtnDefault),i)),{disabled:"single"===i.selection&&1!==this.multipleSelection.length||"multiple"===i.selection&&this.multipleSelection.length<1}),on:{click:()=>this.handleOuterBtn(i.evtType)}},[i.Elicon&&t("i",{class:["el-icon-"+i.Elicon]}),i.icon&&t("svg-icon",{attrs:{"icon-class":i.icon}}),i.name])))])},renderInnerBtn(t){if(!this.innerBtn_||0===this.innerBtn_.length)return;const{TagTableColumn:e,TagButton:i}=this.tags;return t(e,{attrs:l(a({},this.columnDefaultControl),{width:this.config_.tableOptWidth}),scopedSlots:{default:e=>this.innerBtn_.filter((t=>this.showJudgeInner(t,e.row))).map(((s,o)=>s.render?s.render(t,e):t(i,{key:o,attrs:a({},a(a({},this.innerBtnDefault),s)),class:"inner-btn",on:{click:()=>this.handleInnerBtn(s.evtType,e.$index,e.row)}},[s.Elicon&&t("i",{class:["el-icon-"+s.Elicon]}),s.icon&&t("svg-icon",{attrs:{"icon-class":s.icon}}),s.name])))}})},renderColumn(t){const{TagTableColumn:e}=this.tags;return this.config_.columns.map(((i,s)=>"index"===i.type||"selection"===i.type?t(e,{attrs:{align:"center"},props:a({},i)}):i.renderColumn?i.renderColumn(t):t(e,{key:s,props:a({},a(a({},this.columnDefaultNormal),i)),scopedSlots:{default:e=>i.render?i.render(t,{column:i,row:e.row,index:e.$index}):t("span",{class:"td-text"},[e.row[i.prop]])}})))},renderTableSlot(){const t=this.$createElement,e=[t("div",{class:"ml-table-empty",slot:"empty"},[t("img",{attrs:{src:this.emptyImg},class:"ml-table-empty-img"}),t("div",[this.emptyWord])])],i=a({empty:e},this.$slots);i.default&&delete i.default;const s=[];for(const o in i)Object.prototype.hasOwnProperty.call(i,o)&&s.push(t("template",{slot:o},[i[o]]));return s.map((t=>t))},renderTable(t){const e=E({attrs:this.TableDefault},this.config_.nodeData,{directives:[{name:"loading",value:this.loading}],on:{"sort-change":this.onSortChange,"selection-change":this.handleSelectionChange}},{on:this.$listeners,attrs:this.$attrs}),{TagTable:i,TagTableColumn:s}=this.tags;return t(i,c([{ref:"table",attrs:{data:this.data,"row-key":this.config_.tableKey}},e]),[this.config_.selection&&t(s,{props:a({},this.columnDefaultSelection),attrs:{"reserve-selection":this.config_.reserveSelection}}),this.config_.index&&t(s,{props:a({},this.columnDefaultIndex)}),this.renderColumn(t),this.renderInnerBtn(t),this.renderTableSlot()])},renderPagination(){const t=this.$createElement;if(!this.config_.showPagination)return;const{TagPagination:e}=this.tags;return t(e,{attrs:{"current-page":this.currentPage,total:this.total},class:"ml-table-pagination",props:a({},this.paginationConfig_),on:a({},{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange})})}},render(t){return t("div",{class:"ml-table"},[this.renderSearch(),this.renderOuerBtn(t),this.$slots.default,this.renderTable(t),this.renderPagination()])}});class W{constructor(t="element-ui"){this.prefix="",this.TagButton="button",this.TagForm="form",this.TagFormItem="form-item",this.TagOption="option",this.setTags(t)}setTags(t="element-ui"){this.prefix={cui:"c-","element-ui":"el-"}[t],this.TagButton=this.prefix+this.TagButton,this.TagForm=this.prefix+this.TagForm,this.TagFormItem=this.prefix+this.TagFormItem,this.TagOption=this.prefix+this.TagOption}}let F={};function L(t){let e=d.exports.cloneDeep(t),i="输入";return e.type&&["date","dates","daterange","datetime","datetimerange","time","timerange","select","tree","cascader"].includes(e.type)&&(i="选择"),!e.placeholder&&e.label&&(e.placeholder=`请${i}${e.label}`),!e.error&&e.label&&(e.error=`请核对${i}项${e.label}`),e.hasOwnProperty("show")||(e.show=!0),function(t){const e="blur",i=[];void 0!==t.minlength&&i.push({pattern:new RegExp(`^(.|\n){${t.minlength},}$`),message:`输入字符不能少于${t.minlength}个字符`,trigger:e}),void 0!==t.maxlength&&i.push({pattern:new RegExp(`^(.|\n){0,${t.maxlength}}$`),message:`输入字符不能大于${t.maxlength}个字符`,trigger:e}),t.reg&&i.push({pattern:new RegExp(t.reg),message:t.error,trigger:e}),t.required&&i.push({required:!0,message:t.error,trigger:e}),t.rules=[...t.rules||[],...i]}(e),E(function(t){let e={nodeData:{props:{}}};return t.type||t.tag||t.render||(e=F.input),t.type&&(["string"].includes(t.type)?e=F.input:["date","dates","daterange","datetime","datetimerange"].includes(t.type)?(e=F[t.type]||F.date,e.nodeData={props:{type:t.type}}):["time","timerange"].includes(t.type)?(e=F[t.type]||F.time,e.nodeData={props:{type:t.type}}):e=F[t.type]||{},["time","timerange"].includes(t.type)?(e.nodeData.props["value-format"]="HH:mm:ss","timerange"===t.type&&(e.nodeData.props["is-range"]=!0)):["date","dates","daterange"].includes(t.type)?e.nodeData.props["value-format"]="yyyy-MM-dd":["datetime","datetimerange"].includes(t.type)&&(e.nodeData.props["value-format"]="yyyy-MM-dd HH:mm:ss"),["datetimerange"].includes(t.type)&&(e.nodeData.props["default-time"]=["00:00:00","23:59:59"]),["datetimerange","daterange"].includes(t.type)&&(e.nodeData.props["range-separator"]="至",e.nodeData.props["start-placeholder"]="开始时间",e.nodeData.props["end-placeholder"]="结束时间")),e}(e),e)}var H=h.extend({name:"FormItem",props:{configItem:{type:Object,required:!0},originalValue:{type:null,required:!0},rootValue:{type:null,required:!0},rootConfig:{type:Object,required:!0},tags:{type:Object,required:!0}},data:()=>({show:null,beforeHideValue:null,options:[],config_:null}),computed:{value(){var t,e;let i=this.originalValue;return(null==(e=null==(t=this.config_)?void 0:t.format)?void 0:e.toEleValue)&&(i=this.config_.format.toEleValue(i,this.rootValue)),i},isShow(){let t;return t="function"==typeof this.config_.show?this.config_.show(this.rootValue):this.config_.show,t&&!1===this.show?this.$emit("show",this.beforeHideValue):t||!0!==this.show||(this.beforeHideValue=d.exports.cloneDeep(this.value),this.$emit("hide",this.config_.prop)),this.show=t,this.show},itemBoxWidth(){let t=this.config_.itemBoxWidth||this.rootConfig.itemBoxWidth;return t=this.rootConfig.inline?this.config_.block?this.config_.itemBoxWidth||"100%":t||"33.33%":t||"100%",t},itemWidth(){let t="100%";return t=this.config_.block?this.config_.itemWidth||"100%":this.config_.itemWidth||this.rootConfig.itemWidth||"100%",t},itemMaxWidth(){return this.config_.itemMaxWidth||this.rootConfig.itemMaxWidth||"400px"}},created(){this.$watch("configItem",this.onConfigChange,{immediate:!0,deep:!0}),this.$watch("configItem.optionsGet",this.onOptionsGetChange,{immediate:!0})},methods:{async onConfigChange(){this.config_=L(this.configItem),console.log(this.config_)},async onOptionsGetChange(){if("function"==typeof this.config_.optionsGet){const t=await this.config_.optionsGet();Array.isArray(t.content)&&(this.options=t.content)}},onInput(t){var e,i;if(d.exports.isEqual(this.value,t))return;let s=t;(null==(i=null==(e=this.config_)?void 0:e.format)?void 0:i.toValue)&&(s=this.config_.format.toValue(s,this.rootValue)),this.$emit("input",s)},renderChildren(t){if("function"==typeof this.config_.children)return this.config_.children(t);const e=null==(i=this.options)||""===i||Array.isArray(i)&&0===i.length||"object"==typeof i&&0===Object.keys(i).length?this.config_.options:this.options;var i;if(["radio","checkbox","select"].includes(this.config_.type)&&Array.isArray(e)){if("select"===this.config_.type){const{TagOption:i}=this.tags;return e.map(((e,s)=>t(i,{props:a({},e),key:s,attrs:{label:this.config_.optionLabel?e[this.config_.optionLabel]:e.label,value:this.config_.optionValue?e[this.config_.optionValue]:e.value}})))}if("radio"===this.config_.type||"checkbox"===this.config_.type){const i=this.tags.prefix+this.config_.type;return e.map(((e,s)=>t(i,{props:a({},l(a({},e),{label:this.config_.optionValue?e[this.config_.optionValue]:e.value})),key:s},[this.config_.optionLabel?e[this.config_.optionLabel]:e.label])))}}return[]}},render(t){var e,i,s,o,n,r;if(!this.isShow)return;let h;if(!this.config_.prop&&this.config_.render)return this.config_.render(t,this.value,this.onInput);if(this.config_.prop&&this.config_.render)h=this.config_.render(t,this.value,this.onInput),h.componentOptions&&(h.componentOptions=E({listeners:{input:this.onInput},propsData:l(a(a({size:this.rootConfig.size,disabled:this.rootConfig.disabled,clearable:this.rootConfig.clearable,placeholder:this.config_.placeholder},(null==(i=null==(e=this.config_)?void 0:e.nodeData)?void 0:i.props)||{}),(null==(s=this.config_)?void 0:s.props)||{}),{value:this.value})},h.componentOptions)),h.data=E({attrs:a(a({placeholder:this.config_.placeholder},(null==(n=null==(o=this.config_)?void 0:o.nodeData)?void 0:n.attrs)||{}),(null==(r=this.config_)?void 0:r.attrs)||{})},h.data);else{const e={attrs:{placeholder:this.config_.placeholder},props:{value:this.value},on:{input:this.onInput}},i=E({props:{size:this.rootConfig.size,clearable:this.rootConfig.clearable,disabled:this.rootConfig.disabled}},e,this.config_.nodeData,{props:this.config_.props||{},attrs:this.config_.attrs||{}});h=t(this.config_.tag||this.tags.prefix+this.config_.type,c([{},i]),[this.renderChildren(t)])}const{TagFormItem:u}=this.tags;return t("div",{style:{width:this.itemBoxWidth},class:[this.config_.className,{"ml-form-item-box":!0,"hide-round":this.config_.hideRound,hide:!this.isShow}]},[t(u,{class:{"ml-form-item":!0,["ml-form-"+this.config_.type]:!0,"ml-form-item-block":this.config_.block},attrs:{rules:this.config_.rules,label:this.config_.label,prop:this.config_.prop,labelWidth:void 0===this.config_.labelWidth?this.rootConfig.labelWidth:this.config_.labelWidth},style:{width:this.itemWidth,maxWidth:this.itemMaxWidth}},[h])])}}),q=h.extend({name:"MlForm",props:{value:{type:null,default:null},config:{type:Object,required:!0}},data:()=>({initValue:{},config_:null,value_:{},tags:null,defaultOptions:null,framework:"element-ui",componentsPreset:{},configDefault:{inline:!0,labelWidth:"100px",clearable:!0}}),created(){this.initDefault(),this.$watch("config",this.onConfigChange,{deep:!0,immediate:!0}),this.$watch("value",this.onParentValueChange,{deep:!0})},mounted(){for(const t in this.$refs.form)this.$refs.form.hasOwnProperty(t)&&t in this==!1&&Object.defineProperty(this,t,{get:()=>this.$refs.form[t]});this.autoSize()},methods:{onConfigChange(){this.config_=this.getConfig_(),this.init()},onParentValueChange(t){var e,i;let s=t;(null==(i=null==(e=this.config_)?void 0:e.format)?void 0:i.toEleValue)&&(s=this.config_.format.toEleValue(t)),d.exports.isEqual(s,this.value_)||(this.value_=s)},autoSize(){let t=null;this.config_.autoSize&&(this.getSize(),window.onresize=()=>{t&&clearTimeout(t),t=setTimeout(this.getSize,200)})},getSize(){const t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;t<1366?this.$set(this.config_,"size","mini"):t<1600?this.$set(this.config_,"size","small"):t<1680&&this.$set(this.config_,"size","medium")},initDefault(){if(this.defaultOptions=this.MlForm,this.defaultOptions)for(const t in this.defaultOptions)"object"==typeof this.defaultOptions[t]?this[t]=E(this[t],this.defaultOptions[t]):this[t]=this.defaultOptions[t];this.tags=new W(this.framework),function(t,e={}){F=a({input:{tag:t+"input",nodeData:{props:{type:"text"}}},textarea:{tag:t+"input",nodeData:{class:{"text-input":!0},props:{type:"textarea"},attrs:{rows:4}}},select:{tag:t+"select",nodeData:{props:{"popper-append-to-body":!0}}},radio:{tag:t+"radio-group"},checkbox:{tag:t+"checkbox-group"},date:{tag:t+"date-picker"},time:{tag:t+"time-picker"},color:{tag:t+"color-picker"}},e)}(this.tags.prefix,this.componentsPreset)},init(){var t,e;let i=this.value;(null==(e=null==(t=this.config_)?void 0:t.format)?void 0:e.toEleValue)&&(i=this.config_.format.toEleValue(i));const s=this.getDefaultValue();this.value_=a(a({},s),i),this.initValue=s,this.emitValue()},getConfig_(){var t,e;console.log(JSON.stringify(this.config));const i=E(this.configDefault,{labelPosition:"round"===this.config.uiType?"center":"right"},this.config);return i.inline||(i.itemMaxWidth="inherit"),(null==(t=this.config_)?void 0:t.autoSize)&&(null==(e=this.config_)?void 0:e.size)&&(i.size=this.config_.size),console.log(i),i},reset(){this.$emit("input",d.exports.cloneDeep(this.initValue)),this.clearValidate()},resetFields(){this.reset()},clearValidate(t){this.$nextTick((()=>{var e;null==(e=this.$refs.form)||e.clearValidate(t)}))},emitValue(){var t,e;let i=this.value_;(null==(e=null==(t=this.config_)?void 0:t.format)?void 0:e.toValue)&&(i=this.config_.format.toValue(this.value_)),d.exports.isEqual(this.value,i)||this.$emit("input",i)},onInput(t,e){t&&(this.$set(this.value_,t,e),this.emitValue())},getDefaultValue(){const t={};return this.config_.columns.forEach((e=>{e.prop&&(t[e.prop]=this.getValByType(e))})),d.exports.cloneDeep(t)},getValByType:t=>t.hasOwnProperty("value")?t.value:null},render(){const t=arguments[0],e=this.config_,{uiType:i,columns:r,format:a}=e,l=((t,e)=>{var i={};for(var r in t)o.call(t,r)&&e.indexOf(r)<0&&(i[r]=t[r]);if(null!=t&&s)for(var r of s(t))e.indexOf(r)<0&&n.call(t,r)&&(i[r]=t[r]);return i})(e,["uiType","columns","format"]),{TagForm:h}=this.tags;return t(h,c([{ref:"form"},{attrs:l},{},{props:{model:this.value_}},{class:[i,this.config_.size,"label-"+this.config_.labelPosition,"ml-form"]}]),[r.map(((e,i)=>t(H,{attrs:{tags:this.tags,configItem:e,originalValue:this.value_[e.prop],rootValue:this.value_,rootConfig:this.config_},key:i,on:{input:t=>this.onInput(e.prop,t)}}))),this.$slots.default])}});const R={inserted(t,e){t instanceof HTMLButtonElement&&t.addEventListener("click",(()=>{t.disabled||(t.disabled=!0,setTimeout((()=>{t.disabled=!1}),e||500))}))}},G={MlTable:M,MlForm:q};Object.keys(G).forEach((t=>{G[t].install=function(e,i={}){e.prototype[t]=i,e.component(t,G[t])}}));var J=a({install:function(t,e={}){Object.keys(G).forEach((i=>{t.prototype[i]=e[i],t.component(i,G[i])})),t.directive("preventReClick",R)}},G);const N={};var U=S({name:"App"},(function(){var t=this.$createElement;return(this._self._c||t)("router-view",{attrs:{id:"app"}})}),[],!1,(function(t){for(let e in N)this[e]=N[e]}),null,null,null);U.options.__file="examples/App.vue";var K=U.exports;h.use(J),h.component("MdDemo",C),new h({router:k,render:t=>t(K)}).$mount("#app");export{D as c};