// eslint-disable-next-line no-undef
SystemJS.config({
  paths: {
    'npm:': 'https://unpkg.com/',

    'src:': '../src/'
  },
  map: {
    'plugin-json': 'npm:systemjs-plugin-json/json.js',
    'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
    'plugin-css': 'npm:systemjs-plugin-css/css.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',
    'transform-do-expressions': 'npm:babel-plugin-transform-do-expressions',
    'babel-plugin-syntax-do-expressions': 'npm:babel-plugin-syntax-do-expressions',

    'vue': 'npm:vue/dist/vue.js',

    'lodash': 'npm:lodash',
    'mo-query': 'npm:mo-query',

    'lodash.debounce': 'npm:lodash.debounce/index.js',
    'mo-vue-table': 'src:'
  },
  meta: {
    '*.json': {loader: 'plugin-json'},
    '*.css': { loader: 'plugin-css' }
  },
  packages: {
    'mo-vue-table': {
      main: 'api.js',
      meta: {
        '*.js': {
          babelOptions: {
            plugins: ['transform-do-expressions']
          }
        }
      }
    }
  },
  transpiler: 'plugin-babel'
})
