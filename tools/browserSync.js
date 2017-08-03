var browserSync = require('browser-sync');

browserSync({
  open: false,
  logLevel: "debug",
  logFileChanges: true,
  reloadDelay: 200,
  reloadDebounce: 500,
  files: [
    'demo/**/*.js', 'demo/**/*.html', 'demo/**/*.css',
    'src/*.js',
  ],
  watchOptions: {ignored: 'node_modules'},
  server: {baseDir: './',directory: true}
});
