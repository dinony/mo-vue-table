import Vue from 'vue'
import {MoVueTable} from 'mo-vue-table'

import players from './players.json'

import PlayersTable from './PlayersTable/PlayersTable.js'

Vue.use(MoVueTable)

Vue.component('players-table', PlayersTable)

const app = new Vue({el: '#app', data: {players}})
