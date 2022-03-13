// Присваиваю возможности Gulp-a
const { src, dest, watch, parallel, series } = require('gulp');
const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const browserSync  = require('browser-sync').create();

//Создаёмфункцию для работы плагина browser-sync (вся информация есть в документации)
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        //Убирает уведомления о обновлениях в правом верхнем углу
        notify: false
    });
}

// Конвертируем scss в css
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        //Прописываю данные для обновления браузера(browserSync)
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        //Чтоб файлы стали минимизированы их нужно сжать
        //Благодаря этому плагину(uglify) файл main.js станит min.js
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

//Все нужные файлы переносятся в папку dist
function build(){
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
        //Для того, чтоб перенеслись со своими папками(в которых находятся) прописывается дополнительная строка в фигурных скобках:
    ], {base: 'app'})
    //Собрали эти файлы и выкидываем их в:
    .pipe(dest('dist'))
}

//Удаляет папку dist
function cleanDist(){
    return del('dist')
}

// Функция watching "методом" watch заходит в папку app/
function watching() {
    // scss/находит здесь все папки/и все файлы с разрешением .scss , далее следит за изменениями styles
    watch(['app/scss/**/*.scss'], styles);
    // '!app/js/main.min.js' следить за всеми файлами,КРОМЕ(! - оператор HE вроде)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    // Так же нужно назначить смотрящего за html
    watch(['app/**/*.html']).on('change', browserSync.reload);
}


// Прописываем "возможность", чтоб функция заработала : 
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);


// Возможность по дефолту. Благодаря свойству parallel можно объединить нужные,они одновременно будут запускаются при запросе gulp
exports.default = parallel(styles, scripts, browsersync, watching);

