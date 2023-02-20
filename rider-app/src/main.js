import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AOS from "aos";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Toast from "vue-toastification";
import vuetify from "./plugins/vuetify";
import VAnimateCss from "v-animate-css";
import "aos/dist/aos.css";
import "bootstrap";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toastification/dist/index.css";
import "boxicons/css/boxicons.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "animate.css";

AOS.init();
Vue.use(Toast, {
 position: "bottom-left",
 timeout: 3000,
 closeOnClick: true,
 pauseOnFocusLoss: false,
 pauseOnHover: true,
 showCloseButtonOnHover: false,
 hideProgressBar: true,
 closeButton: false,
 icon: true,
 rtl: false,
 maxToasts: 1,
 transition: "Vue-Toastification__fade",
 newestOnTop: true,
 filterBeforeCreate: (toast, toasts) => {
  if (toasts.filter((t) => t.type === toast.type).length !== 0) {
   return false;
  }
  return toast;
 },
});

Vue.config.productionTip = false;
Vue.use(VAnimateCss);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
 router,
 store,
 vuetify,
 render: (h) => h(App),
}).$mount("#app");
