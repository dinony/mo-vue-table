import debounce from 'lodash.debounce'
import {moLocalTable} from 'mo-vue-table'

import './PlayersTable.css'

export default {
  mixins: [moLocalTable],
  data: () => ({
    columns: ['id', 'name', 'age', 'points'],
    select: ['id', 'name', 'age', 'points'],
    selectOrdered: [['id', 1], ['name', 2], ['age', 3], ['points', 4]],
    filtersDescr: {
      'id': {type: 'number'},
      'name': {type: 'text'},
      'age': {type: 'number'},
      'points': {type: 'number'}
    },
    query: `{
     "points": {"$gt":600},
     "$or": [
      {"age": {"$lt":18}},
      {"age": {"$gt":80}}
     ]
    }`,
    syntaxErr: null,
    ops: ['=', '<>', '>', '<', '>=', '<=', 'in', 'not in', 'between', 'like'],
    opNameMap: {
      '=': '$eq',
      '<>': '$ne',
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      'in': '$in',
      'not in': '$nin',
      'between': '$btw',
      'like': '$lk'
    },
    limits: [3, 5, 10, 25, 50],
    limit: 5
  }),
  created: function() {
    // Init query
    this.moSetWhereState(JSON.parse(this.query))
  },
  computed: {
    selected: function() {
      return this.selectOrdered.filter(so => this.select.find(s => s === so[0]))
    }
  },
  methods: {
    addFilter: function() {
      this.filters.push({left: this.moSelectedColumns[0][0], op: this.ops[0], right: null})
    }
  },
  watch: {
    query: {
      handler: debounce(function() {
        try {
          const query = JSON.parse(this.query)
          this.syntaxErr = ''
          this.moSetWhereState(query)
        } catch(syntaxErr) {
          this.syntaxErr = syntaxErr
        }
      }, 500)
    },
    selected: {
      handler: function(selected) { this.moSetSelectState(selected) },
      immediate: true
    },
    limit: {
      handler: function(limit) { this.moSetLimit(limit) },
      immediate: true
    }
  },
  template: `
    <div>
      <h1>Local Table</h1>
      <div class="info">
        <span v-for="column in columns">
          <input type="checkbox" :value="column" v-model="select"> {{column}}
        </span>
        {{select}}
      </div>
      <div class="info show">
        <span>Show</span>
        <select v-model="limit">
          <option v-for="limit in limits" :value="limit">{{limit}}</option>
        </select>
      </div>
      <table class="players">
        <thead>
          <th v-mo-toggle-orderby="column[0]" :key="column[1]" v-for="column in moSelectedColumns"
            :class="moColumnOrder(column[0]) !== null ? 'mo-' + moColumnOrder(column[0]) : ''">
            {{column[0]}}
          </th>
        </thead>
        <tbody>
          <tr v-for="player in moDisplayed">
            <td :key="column[1]" v-for="column in moSelectedColumns">{{player[column[0]]}}</td>
          </tr>
        </tbody>
      </table>

      <div class="info">
        <button @click="moPrevPage" :disabled="moCurPage <= 0">Prev</button>
        <button @click="moNextPage" :disabled="moCurPage >= (moNumPages - 1)">Next</button>
        <div>NumResults: {{moNumResults}}, NumPages: {{moNumPages}}, Current page: {{moCurPage}}</div>
      </div>

      <div class="info">
        <textarea v-model="query" placeholder="Complex query" rows="10"></textarea>
        <div v-if="syntaxErr !== null">
          <p v-if="syntaxErr.lineNumber">Line: {{syntaxErr.lineNumber}}</p>
          <p v-if="syntaxErr.columnNumber">Column: {{syntaxErr.columnNumber}}</p>
          <pre v-if="">{{syntaxErr.message}}</pre>
          <pre v-if="">{{syntaxErr.stack}}</pre>
        </div>
      </div>

      <div class="info">
        OrderBy
        <pre>{{moOrder}}</pre>
      </div>
    </div>
  `
}
