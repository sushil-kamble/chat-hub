import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "@/firebase/init.js";
import VueChatScroll from "vue-chat-scroll";

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

let app;
auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
    store.dispatch("fetchUser", user).then(r => r); // SET OR RESET USER
    // SET IF ONLINE : RESET IF OFFLINE
  }
});
