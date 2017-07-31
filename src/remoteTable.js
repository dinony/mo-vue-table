import reduce from 'lodash.reduce';

import {moBaseTable} from './baseTable';

export const moRemoteTable = {
  mixins: [moBaseTable],
  data: () => {
    return {
      moRemoteTable: {
        config: {
          token: {
            select: 'select',
            orderby: 'oderby',
            orderbyDir: 'direction',
            limit: 'limit',
            offset: 'offset'
          }
        }
      }
    };
  },
  computed: {
    moQuery: function() {
      let qOrderBy = ''
      let qDir = ''
      let qSelect = ''
      let qLimit = ''
      let qOffset = ''
      let qWhereIs = ''

      const token = this.moRemoteTable.config.token;

      const [columns, orders] = this.moOrder
      if(columns !== undefined && orders !== undefined && columns.length > 0 && orders.length > 0) {
        qOrderBy = columns.reduce((accum, val, i) => i === 0 ? `${token.orderby}=${accum}${val}` : `${accum},${val}`, '')
        qDir = orders.reduce((accum, val, i) => i === 0 ? `${token.oderbyDir}=${accum}${val}` : `${accum},${val}`, '');
      }

      const select = this.moTable.select;
      if(select !== null && select.length > 0) {
        qSelect = select.reduce((accum, [s, _], i) => i === 0 ? `${token.select}=${s}` : `${accum},${s}`, '')
      }

      const limit = this.moTable.limit
      if(limit !== null) {
        qLimit = `${token.limit}=${limit}`
      }

      const offset = this.moTable.offset
      if(offset !== null) {
        qOffset = `${token.offset}=${offset}`
      }

      const where = this.moTable.where
      if(where !== null) {
        qWhereIs = reduce(where, (accum, val, col) => accum.length === 0 ? `is=${col}-${val}` : `${accum},${col}-${val}`, '')
      }

      const queryParams = [qOrderBy, qDir, qSelect, qLimit, qOffset, qWhereIs].filter(q => q.length > 0);

      return queryParams.reduce((accum, q, i) => i === 0 ? `?${q}` : `${accum}&${q}`, '')
    },
  }
};
