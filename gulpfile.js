const { src, dest, series, parallel, watch } = require("gulp");
const browsersync = require("browser-sync").create();

function copyHtmlFiles() {
    return src(["src/**/*.html"], { base: "src" }).pipe(dest("dist/"));
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
    watch("src/**/*.html", series(copyHtmlFiles, browsersyncReload));
    watch("dist/assets/css/*.css", browsersyncReload);
}

exports.copyFontawesomeFiles = copyFontawesomeFiles;
exports.copyBootstrapJs = copyBootstrapJs;

// Default Gulp task
exports.default = series(
    parallel(copyBootstrapJs, copyHtmlFiles, copyFontawesomeFiles),
    browsersyncServe,
    watchTask
);
