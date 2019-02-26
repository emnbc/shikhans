var gulp = require("gulp"),
    sass = require("gulp-sass"),
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
    .pipe(browserSync.reload({stream:true}));
});
gulp.task("browser-sync", function(){
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});
gulp.task("scripts", function(){
  return gulp.src([
    "app/shikhans/libs/jquery/dist/jquery.min.js",
    "app/shikhans/libs/magnific-popup/dist/jquery.magnific-popup.min.js"
  ])
  .pipe(concat("libs.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("app/shikhans/js"));
});
gulp.task("css-libs",["sass"], function(){
  return gulp.src("app/shikhans/css/libs.css")
  .pipe(cssnano())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("app/shikhans/css"));
});
gulp.task("watch", ["browser-sync", "sass"], function(){
  gulp.watch("app/shikhans/sass/**/*.sass", ["sass"]);
  gulp.watch("app/shikhans/**/*.html", browserSync.reload);
  gulp.watch("app/shikhans/js/**/*.js", browserSync.reload);
});
gulp.task("clean", function() {
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
gulp.task("build", ["clean", "img", "sass", "scripts"], function (){
  var buildCss = gulp.src([
    "app/shikhans/css/main.css",
    "app/shikhans/css/libs.min.css"
  ])
  .pipe(gulp.dest("dist/shikhans/css"));
  var buildFonts = gulp.src("app/shikhans/fonts/**/*")
  .pipe(gulp.dest("dist/shikhans/fonts"));
  var buildJs = gulp.src("app/shikhans/js/**/*")
  .pipe(gulp.dest("dist/shikhans/js"));
  var buildHtml = gulp.src("app/shikhans/*.html")
  .pipe(gulp.dest("dist/shikhans"));
});

gulp.task("clear", function() {
  return cache.clearAll();
});
