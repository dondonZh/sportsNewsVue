const state = {
  list: [],
  maxId:'',
}
const getters = {
  backlist: state => state.list,
  /*  backlist(state){
      return state.list;
    }*/
  backmaxId: state => state.maxId
}

const actions = {
  saveList({commit}, list) {
    commit('SAVE_LIST', list);
  },
  resetList({commit}) {
    commit('RESET_LIST');
  },
  saveMaxId({commit},maxId) {
    commit('SAVE_MAXID', maxId);
  }
}
const mutations = {
  ['SAVE_LIST'](state, list) {
    console.log('list',list);
    state.list.push(...list);
  },
  ['RESET_LIST'](state) {
    state.list = [];
  },
  ['SAVE_MAXID'](state, maxId) {
    state.maxId = maxId
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}

