const gulp = require("gulp");
const bs = require("browser-sync").create();

const watching = () => {
  gulp.watch(["src/**/*.html"], gulp.parallel("html"));
  gulp.watch(["src/**/*.scss"], gulp.parallel("style"));
  gulp.watch(["src/**/*.js"], gulp.parallel("dev_js"));
  gulp.watch(["build/**/*.*"]).on("change", bs.reload);
};

module.exports = watching;
