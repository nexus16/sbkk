import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// socket io
import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io('192.168.68.108:8080', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    }), // options object is Optional
  })
);

Vue.config.productionTip = false;
Vue.use(VueMaterial)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    step1_start_app: true,
    step2_check_customer: false,
    step3_check_action: false,
    step4_confirm_action: false,
    step5_display_option: false,
    step6_display_noti: false,
    user_datas: {},

  },
  mutations: {
    startApp (state) {
      state.step1_start_app = true
      state.step2_check_customer = false
      state.step3_check_action = false
      state.step4_confirm_action = false
      state.step5_display_option = false
      state.step6_display_noti = false
    },
    checkCustomer (state) {
      state.step1_start_app = false
      state.step2_check_customer = true
      state.step3_check_action = false
      state.step4_confirm_action = false
      state.step5_display_option = false
      state.step6_display_noti = false
    },
    checkAction (state) {
      state.step1_start_app = false
      state.step2_check_customer = false
      state.step3_check_action = true
      state.step4_confirm_action = false
      state.step5_display_option = false
      state.step6_display_noti = false
    },
    confirmAction (state) {
      state.step1_start_app = false
      state.step2_check_customer = false
      state.step3_check_action = false
      state.step4_confirm_action = true
      state.step5_display_option = false
      state.step6_display_noti = false
    },
    displayAction (state) {
      state.step1_start_app = false
      state.step2_check_customer = false
      state.step3_check_action = false
      state.step4_confirm_action = false
      state.step5_display_option = true
      state.step6_display_noti = false
    },
    displayNoti (state) {
      state.step1_start_app = false
      state.step2_check_customer = false
      state.step3_check_action = false
      state.step4_confirm_action = false
      state.step5_display_option = false
      state.step6_display_noti = true
    },
    setUserData (state, data) {
      state.user_datas = data
    }
  },
  actions: {

  }
})
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
