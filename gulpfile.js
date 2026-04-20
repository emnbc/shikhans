var gulp = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglifyjs"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename"),
    del = require("del"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    cache = require("gulp-cache"),
    autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function (){
  return gulp.src("app/shikhans/sass/**/*.sass")
    .pipe(sass())
    .pipe(autoprefixer(["last 15 versions","> 1%", "ie 8", "ie 7"], {cascade: true}))
    .pipe(gulp.dest("app/shikhans/css"))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", function(done){
  browserSync({
    server: {
      baseDir: "app/shikhans"
    },
    notify: false
  });
  done();
});

gulp.task("scripts", function(){
  return gulp.src([
    "app/shikhans/libs/jquery/dist/jquery.min.js",
    "app/shikhans/libs/magnific-popup/dist/jquery.magnific-popup.min.js"
  ], { allowEmpty: true })
  .pipe(concat("libs.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("app/shikhans/js"));
});

gulp.task("css-libs", gulp.series("sass", function(){
  return gulp.src("app/shikhans/css/libs.css", { allowEmpty: true })
  .pipe(cssnano())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("app/shikhans/css"));
}));

gulp.task("watch", gulp.parallel("browser-sync", "sass", function(){
  gulp.watch("app/shikhans/sass/**/*.sass", gulp.series("sass"));
  gulp.watch("app/shikhans/**/*.html").on("change", browserSync.reload);
  gulp.watch("app/shikhans/js/**/*.js").on("change", browserSync.reload);
}));

gulp.task("clean", async function() {
  return del.sync("dist");
});

gulp.task("img", function(){
  return gulp.src("app/shikhans/img/**/*")
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest("dist/shikhans/img"));
});

gulp.task("build", gulp.series("clean", gulp.parallel("img", "sass", "scripts"), function (done){
  var buildCss = gulp.src([
    "app/shikhans/css/main.css",
    "app/shikhans/css/libs.min.css"
  ], { allowEmpty: true })
  .pipe(gulp.dest("dist/shikhans/css"));
  var buildFonts = gulp.src("app/shikhans/fonts/**/*", { allowEmpty: true })
  .pipe(gulp.dest("dist/shikhans/fonts"));
  var buildJs = gulp.src("app/shikhans/js/**/*", { allowEmpty: true })
  .pipe(gulp.dest("dist/shikhans/js"));
  var buildHtml = gulp.src("app/shikhans/*.html", { allowEmpty: true })
  .pipe(gulp.dest("dist/shikhans"));
  done();
}));

gulp.task("clear", function() {
  return cache.clearAll();
});

gulp.task("default", gulp.series("watch"));
