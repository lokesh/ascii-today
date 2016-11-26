import Vue from 'vue'
import App from './App.vue'

import store from './vuex/store.js'

new Vue({
  // This will inject the store instance to all child components who access it with: this.$store.
  store,
  el: '#app',
  render: h => h(App)
})
