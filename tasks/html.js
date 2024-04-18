const { src, dest } = require("gulp");
const include = require("gulp-file-include");
const bs = require("browser-sync").create();

module.exports = html = () => {
  return src(["src/**/*.html", "!src/components/*.html"])
    .pipe(include())
    .pipe(dest("build"))
    .pipe(bs.stream())
};
