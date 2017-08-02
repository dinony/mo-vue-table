SystemJS.config({
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    'plugin-json': 'npm:systemjs-plugin-json/json.js',
    'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',

    'vue': 'npm:vue/dist/vue.min.js'
  },
  meta: { '*.json': { loader: 'plugin-json' } },
  transpiler: 'plugin-babel'
})
