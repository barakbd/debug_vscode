/* 
1. Pull in the tsconfig.json and pass it to gulp-typescript for configuration
2. Tell gulp-typescript to transpile our project and deliver it to “dist”
3. Tell Gulp to watch our source .ts files, so that our transpiled JavaScript automatically gets rebuilt upon file changes 
*/

const gulp = require("gulp");
const ts = require("gulp-typescript");
const nodemon = require("gulp-nodemon");
const sourcemaps = require("gulp-sourcemaps");

const path = require("path");

const JSON_FILES = ["src/*.json", "src/**/*.json"];

gulp.task("compile", () => {
  return (
    gulp
      .src(["src/**/*.ts", "!src/exlude_ts_test.ts"])
      .pipe(sourcemaps.init())
      .pipe(
        ts({
          target: "es6",
          module: "commonjs",
          moduleResolution: "node",
          noImplicitAny: true,
          removeComments: true
        })
      )
      /*     external sourceMaps
    .pipe(
      sourcemaps.write(".")
    )
 */
      .pipe(
        sourcemaps.write({
          includeContent: false,
          sourceRoot: "../src/"
          /* function(file) {
            // Difference from westy92's solution:
            //   file.path contains the absolute file path (including file name),
            //   so I get the file's directory and calculate the relative path to the base directory.
            return path.relative(path.dirname(file.path), file.base);
          } */
        })
      )

      .pipe(gulp.dest("dist"))
  );
});

gulp.task("watch", ["compile"], () => {
  gulp.watch("src/**/*.ts", ["compile"]);
});

gulp.task("assets", function() {
  return gulp.src(JSON_FILES).pipe(gulp.dest("dist"));
});

// gulp.task('default', ['watch', 'assets']);
gulp.task("default", ["watch", "assets"], function() {
  const stream = nodemon({
    script: "dist/index.js",
    watch: "src",
    tasks: ["compile", "assets"],
    env: { DEBUG: "Application,Request,Response" }
  });
  return stream;
});
