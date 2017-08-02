SystemJS.config({
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    'plugin-json': 'npm:systemjs-plugin-json/json.js',
    'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
    'plugin-css': 'npm:systemjs-plugin-css/css.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',

    'vue': 'npm:vue/dist/vue.min.js',

    'mo-query': 'npm:mo-query/dist/mo-query.umd.min.js',
    'lodash.debounce': 'npm:lodash.debounce/index.js'
  },
  meta: {
    '*.json': {loader: 'plugin-json'},
    '*.css': { loader: 'plugin-css' }
  },
  transpiler: 'plugin-babel'
})
