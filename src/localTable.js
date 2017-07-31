import orderBy from 'lodash.orderby';
import head from 'lodash.head';

import {moBaseTable} from './baseTable';
import {compile} from './query';

export const moLocalTable = {
  mixins: [moBaseTable],
  props: ['moTableData'],
  computed: {
    moQueried: function() {
      const queryFuncs = compile(this.moTable.where);
      const filterFunc = row => queryFuncs.find(f => !f(row)) === undefined;
      return this.moTableData.filter(filterFunc);
    },
    moSelected: function() {
      return this.moQueried.map(row => {
        const newRow = {};

        this.moTable.select.forEach(c => {
          newRow[head(c)] = row[head(c)];
        });

        return newRow;
      });
    },
    moOrdered: function() {
      const [columns, orders] = this.moOrder;
      return orderBy(this.moSelected, columns, orders);
    },
    moNumResults: function() {
      return this.moOrdered.length;
    },
    moDisplayed: function() {
      const limit = this.moTable.limit || this.moOrdered.length;
      const offset = this.moTable.offset || 0;

      return this.moOrdered.slice(offset, offset + limit);
    }
  }
};
