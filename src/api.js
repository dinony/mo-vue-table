export {moBaseTable} from './baseTable'
export {moLocalTable} from './localTable'
export {moRemoteTable} from './remoteTable'

import {moToggleOrderBy} from './toggleOrderBy'

export {moToggleOrderBy}

export const MoVueTable = {
  install: Vue => {
    // Expose directive via plugin
    Vue.directive('mo-toggle-orderby', moToggleOrderBy)
  }
}
