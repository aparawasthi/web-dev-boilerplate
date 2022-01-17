const { src, dest, series, parallel, watch } = require("gulp");
const fileinclude = require("gulp-file-include");
const browsersync = require("browser-sync").create();

function processHtmlFiles() {
    return src(["src/**/*.html", "!src/**/common/**/*"])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(dest("dist/"));
}

function copyFontawesomeFiles() {
    return src([
        "node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
    ]).pipe(dest("dist/assets/webfonts"));
}

function copyBootstrapJs() {
    return src([
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
    ]).pipe(dest("dist/assets/js"));
}

// Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: "dist",
        },
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch("src/**/*.html", series(processHtmlFiles, browsersyncReload));
    watch("dist/assets/css/*.css", browsersyncReload);
}

exports.copyFontawesomeFiles = copyFontawesomeFiles;
exports.copyBootstrapJs = copyBootstrapJs;

// Default Gulp task
exports.default = series(
    parallel(copyBootstrapJs, processHtmlFiles, copyFontawesomeFiles),
    browsersyncServe,
    watchTask
);

exports.build = series(
    parallel(copyBootstrapJs, processHtmlFiles, copyFontawesomeFiles)
);
