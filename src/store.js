import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keys:[],
    games:[]
  },
  mutations: {

  },
  actions: {
    async deleteKey(context, key) {
      await idb.deleteData(key, 'keys'); 
    },
    async getKeys(context, id_game) {
      context.state.keys = [];
      let keys = await idb.getDatasWithFilter('keys', 'id_game', id_game);
      keys.forEach(c => {
        context.state.keys.push(c);
      });
    },
    async saveKey(context, key) {
      await idb.saveData(key, 'keys');
    },


    async deleteGame(context, game) {
      let keys = await idb.getDatasWithFilter('keys', 'id_game', game.id);
      keys.forEach(c => {
        idb.deleteData(c, 'keys'); 
      });
      await idb.deleteData(game, 'games'); 
    },
    async getGames(context) {
      context.state.games = [];
      let games = await idb.getDatas('games');
      games.forEach(c => {
        context.state.games.push(c);
      });
    },
    async saveGame(context, game) {
      await idb.saveData(game, 'games');
    }
  }
})
