import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes} from './routes';
import VueSimpleAlert from "vue-simple-alert";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VModal from 'vue-js-modal'
import VueConfirmDialog from 'vue-confirm-dialog'




import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';



// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});




// Install components globally

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);




window.axios = require('axios');

Vue.use(VueConfirmDialog)
Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueSimpleAlert);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  // scrollBehavior(to, from, savedPosition) {
  //   if(savedPosition){
  //     return savedPosition;
  //   }
  //   if (to.hash) {
  //     return { selector: to.hash };

  //   }
  //   // return {x:0, y:700};

  // }
});

router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next();

});



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
