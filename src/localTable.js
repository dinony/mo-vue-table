import _ from 'lodash'
import {compile} from 'mo-query'
import {fst} from './fp'

import {moBaseTable} from './baseTable'

export const moLocalTable = {
  mixins: [moBaseTable],
  props: ['moTableData'],
  computed: {
    moQueried: function() {
      const queryFuncs = compile(this.moTable.where)
      const filterFunc = row => queryFuncs.find(f => !f(row)) === undefined
      return this.moTableData.filter(filterFunc)
    },
    moSelected: function() {
      return this.moQueried.map(row => {
        const newRow = {}

        this.moTable.select.forEach(c => {
          newRow[fst(c)] = row[fst(c)]
        })

        return newRow
      })
    },
    moOrdered: function() {
      const [columns, orders] = this.moOrder
      return _.orderBy(this.moSelected, columns, orders)
    },
    moNumResults: function() {
      return this.moOrdered.length
    },
    moDisplayed: function() {
      const limit = this.moTable.limit || this.moOrdered.length
      const offset = this.moTable.offset || 0

      return this.moOrdered.slice(offset, offset + limit)
    }
  }
}
