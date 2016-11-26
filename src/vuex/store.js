import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

// use() installs plugins
Vue.use(Vuex);

const SANTA_MONICA = {
  left: -116,
  top: -3013
}

const state = {
  mapLoaded: false,
  mapName: 'Los Angeles',
  coordinates: SANTA_MONICA,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
