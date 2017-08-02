SystemJS.config({
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',

    'vue': 'npm:vue/dist/vue.min.js'
  },
  transpiler: 'plugin-babel'
})
