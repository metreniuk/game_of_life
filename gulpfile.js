var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("es6", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("es6:watch", function () {
  gulp.watch("src/app.js", ['es6']);
});

gulp.task('default', ['es6:watch']);