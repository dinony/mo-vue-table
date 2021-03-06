// eslint-disable-next-line no-undef
System.config({
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    'plugin-json': 'npm:systemjs-plugin-json/json.js',
    'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
    'plugin-css': 'npm:systemjs-plugin-css/css.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',

    'vue': 'npm:vue/dist/vue.js',

    'lodash': 'npm:lodash',
    'mo-query': 'npm:mo-query',

    'lodash.debounce': 'npm:lodash.debounce/index.js',
    'mo-vue-table': 'npm:mo-vue-table/dist/mo-vue-table.umd.min.js'
  },
  meta: {
    '*.json': {loader: 'plugin-json'},
    '*.css': { loader: 'plugin-css' }
  },
  transpiler: 'plugin-babel'
})
