import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import HomeView from './views/layout/HomeView.vue'
import BlankView from './views/layout/BlankView.vue'
import Lottie from 'vue-lottie'


Vue.config.productionTip = false
Vue.component('lot-tie',Lottie)
Vue.component('default-layout',HomeView);
Vue.component('blank-layout',BlankView);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
