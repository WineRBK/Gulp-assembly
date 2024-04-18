const bs = require('browser-sync').create()

module.exports = function server() {
  bs.init({
    server: {
      baseDir: "build/",
      host: "192.168.0.107",
    }
  });
};


