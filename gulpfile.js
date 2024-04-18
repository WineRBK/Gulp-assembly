const gulp = require("gulp");
const requireDir = require("require-dir");
const tasks = requireDir("tasks/");
const bs = require("browser-sync").create();

function server() {
  bs.init({
		server: {
			baseDir: 'build/',
			host: '192.168.0.104',
		},
		callbacks: {
			ready: function (err, bs) {
				bs.addMiddleware("*", function (req, res) {
					res.writeHead(302, {
						location: "404.html"
					});
					res.end("Redirecting!");
				});
			}
		},
		browser: 'chrome',
		logPrefix: 'BS-HTML:',
		logLevel: 'info',
		logConnections: true,
		logFileChanges: true,
		open: true
	})
}

function bs_php() {
  bs.init({
    server: {
			baseDir: 'build/',
			host: '192.168.0.104',
		},
		browser: ['chrome'],
		watch: true,
		proxy: '',
		logLevel: 'info',
		logPrefix: 'BS-PHP:',
		logConnections: true,
		logFileChanges: true,
	})
}

function watching() {
  gulp.watch(["src/**/*.html"], gulp.parallel("html"));
  gulp.watch(["src/**/*.scss"], gulp.parallel("style"));
  gulp.watch(["src/**/*.js"], gulp.parallel("dev_js"));
  gulp.watch(["src/**/*.js"], gulp.parallel("rastr"));
  gulp.watch(
    "src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)",
    gulp.parallel("rastr")
  );
  gulp.watch("build/img/**/*.+(png|jpg|jpeg)", gulp.parallel("webp"));
  gulp.watch("src/svg/**/*.+(png|jpg|jpeg)", gulp.parallel("webp"));
  gulp.watch('src/svg/css/**/*.svg', gulp.series('svg_css', 'style'));
  gulp.watch('src/svg/sprite/**/*.svg', gulp.series('svg_sprite', 'rastr'));
  gulp.watch('src/fonts/*.*', gulp.series('ttf'))
  gulp.watch(["build/**/*.*"]).on("change", bs.reload);
}

exports.server = server;
exports.bs_php = bs_php;
exports.php = tasks.php;
exports.style = tasks.style;
exports.html = tasks.html;
exports.dev_js = tasks.dev_js;
exports.rastr = tasks.rastr;
exports.webp = tasks.webp;
exports.svg_css = tasks.svg_css;
exports.svg_sprite = tasks.svg_sprite;
exports.ttf = tasks.ttf;
// exports.fonts = tasks.fonts;
exports.watch = watching;

exports.default = gulp.parallel(
  exports.html,
  exports.style,
  exports.dev_js,
  exports.webp,
  exports.svg_css,
  exports.svg_sprite,
  exports.ttf,
	// exports.fonts,
  exports.server,
  exports.watch
);

exports.dev_php = gulp.parallel(
  exports.style,
  exports.dev_js,
  exports.webp,
  exports.svg_css,
  exports.svg_sprite,
	exports.php,
	exports.bs_php,
  exports.watch
)
