import Vue from "vue";
import router from "./router";
import mlComponents from "@/main";
import App from "./App.vue";
import BaseSourceView from "./components/BaseSourceView";

Vue.use(mlComponents).component("BaseSourceView", BaseSourceView);

Vue.prototype.$ELEMENT = { size: "small", zIndex: 2000 };

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
