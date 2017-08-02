import Vue from 'vue'
import players from './players.json'

import PlayersTable from './PlayersTable/PlayersTable.js'

Vue.component('players-table', PlayersTable)

new Vue({el: '#app', data: {players}})
