import unzip from 'lodash.unzip';
import reduce from 'lodash.reduce';
import head from 'lodash.head';
import last from 'lodash.last';

export const moBaseTable = {
  data: () => {
    return {
      moTable: {
        select: [],
        where: {},
        orderBy: {},
        limit: 25,
        offset: 0,
        config: {
          orderBy: {
            token: {
              asc: 'asc',
              desc: 'desc'
            }
          }
        }
        //groupBy: {},
      }
    };
  },
  created: function() {
    this.$on('moToggleOrderBy', this.moToggleOrderByState);
  },
  computed: {
    moOrder: function() {
      const orderByState = this.moTable.orderBy;

      const orderByArr = [];
      for(const c in orderByState) {
        if(this.moTable.select.find(selected => selected[0] === c)) {
          orderByArr.push([c, head(orderByState[c]), last(orderByState[c])]);
        }
      }

      orderByArr.sort((o1, o2) => last(o1) > last(o2));

      const orderByColumns = orderByArr.map(o => [head(o), o[1]]);

      return unzip(orderByColumns);
    },
    moColumnOrder: function() {
      return column => {
        const oState = this.moTable.orderBy[column];
        return oState !== undefined ? head(oState) : null;
      };
    },
    moSelectedColumns: function() {
      return this.moTable.select;
    },
    moNumPages: function() {
      return Math.ceil(this.moNumResults / this.moTable.limit);
    },
    moCurPage: function() {
      return Math.floor(this.moTable.offset / this.moTable.limit);
    },
  },
  methods: {
    moToggleOrderByState: function(column) {
      const orderByState = this.moTable.orderBy;
      const token = this.moTable.config.orderBy.token;

      const toggleDirection = direction => do {
        if(direction === null) {
          token.asc;
        } else if(direction === token.asc) {
          token.desc;
        } else {
          null;
        }
      };

      const getOrderCounter = _orderByState => reduce(_orderByState, ((accum, val) => {
        return last(val) > accum ? last(val) : accum;
      }), 0);

      const columnOrder = orderByState[column];

      if(columnOrder !== undefined) {
        const direction = toggleDirection(head(columnOrder));

        if(direction === null) {
          this.$delete(orderByState, column);
        } else {
          this.$set(orderByState, column, [direction, last(columnOrder)]);
        }
      } else {
        const orderCounter = getOrderCounter(orderByState);
        this.$set(orderByState, column, [token.asc, orderCounter+1]);
      }
    },
    moSetLimit: function(limit) {
      this.moTable.limit = limit;
    },
    moSetOffset: function(offset) {
      this.moTable.offset = offset;
    },
    moSetWhereState: function(where) {
      this.$set(this.moTable, 'where', where);
    },
    moSetSelectState: function(select) {
      this.$set(this.moTable, 'select', select);
    },
    moGotoPage: function(page) {
      this.moTable.offset = page * this.moTable.limit;
    },
    moNextPage: function() {
      if(this.moCurPage < this.moNumPages) {
        this.moTable.offset = (this.moCurPage + 1) * this.moTable.limit;
      }
    },
    moPrevPage: function() {
      if(this.moCurPage > 0) {
        this.moTable.offset = (this.moCurPage - 1) * this.moTable.limit;
      }
    }
  }
}
