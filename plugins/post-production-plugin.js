const beautify = require('simply-beautiful');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const cheerio = require('cheerio');

class PostProductionPlugin {
    options = {
        indent_size: 4,
        space_before_conditional: true,
        jslint_happy: true,
        max_char: 0,
    };

    aliases = {
        '@assets': '/assets',
    };

    info(text) {
        console.log('\x1b[34m', text, '\x1b[0m');
    }

    constructor(options) {
        this.options = options || this.options;
    }

    apply(compiler) {
        // Обрабатываем файлы в памяти для devServer и продакшен
        compiler.hooks.thisCompilation.tap('PostProductionPlugin', (compilation) => {
            compilation.hooks.processAssets.tapAsync(
                {
                    name: 'PostProductionPlugin',
                    stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                },
                (assets, callback) => {
                    this.info('Старт пост-обработки HTML-файлов в памяти');

                    // Обрабатываем все HTML-файлы из активов
                    for (const [filename, asset] of Object.entries(assets)) {
                        if (filename.endsWith('.html')) {
                            let content = asset.source().toString(); // Получаем содержимое файла

                            // Парсим HTML с помощью cheerio
                            const $ = cheerio.load(content);

                            // Обрабатываем все теги <a> с атрибутом href
                            $('a[href]').each((i, elem) => {
                                let href = $(elem).attr('href');
                                for (const [alias, replacement] of Object.entries(this.aliases)) {
                                    if (href && href.startsWith(alias)) {
                                        href = href.replace(alias, replacement);
                                        $(elem).attr('href', href);
                                    }
                                }
                            });

                            // Форматируем HTML
                            content = beautify.html($.html(), this.options);

                            // Обновляем актив в компиляции
                            compilation.updateAsset(filename, new compiler.webpack.sources.RawSource(content));
                            this.info(`Обработан HTML-файл в памяти: ${filename}`);
                        }
                    }

                    // Обрабатываем CSS-файлы
                    for (const [filename, asset] of Object.entries(assets)) {
                        if (filename.endsWith('.css')) {
                            let content = asset.source().toString();
                            content = beautify.css(content, this.options);
                            compilation.updateAsset(filename, new compiler.webpack.sources.RawSource(content));
                            this.info(`Обработан CSS-файл в памяти: ${filename}`);
                        }
                    }

                    callback();
                }
            );
        });

        // Для продакшен-билда дополнительно обрабатываем файлы на диске
        compiler.hooks.done.tapAsync('PostProductionPlugin', (stats, callback) => {
            if (stats.compilation.options.mode === 'production') {
                this.info('Старт пост-обработки файлов на диске (продакшен)');
                this.BeautifyHTMLOnDisk();
                this.BeautifyCSSOnDisk();
                this.info('Пост-обработка файлов на диске завершена');
            }
            callback();
        });
    }

    BeautifyHTMLOnDisk() {
        const buildFolder = path.resolve(__dirname, '../dist');
        const htmlArray = glob.globSync(`${buildFolder}/*.html`);

        for (const htmlFile of htmlArray) {
            const filename = path.basename(htmlFile);
            let content = fs.readFileSync(htmlFile, 'utf-8');

            // Парсим HTML с помощью cheerio
            const $ = cheerio.load(content);

            // Обрабатываем все теги <a> с атрибутом href
            $('a[href]').each((i, elem) => {
                let href = $(elem).attr('href');
                for (const [alias, replacement] of Object.entries(this.aliases)) {
                    if (href && href.startsWith(alias)) {
                        href = href.replace(alias, replacement);
                        $(elem).attr('href', href);
                    }
                }
            });

            // Форматируем HTML
            content = beautify.html($.html(), this.options);

            // Записываем результат на диск
            fs.writeFileSync(fs.realpathSync(htmlFile), content);
            this.info(`Обработан файл на диске: ${filename}`);
        }
    }

    BeautifyCSSOnDisk() {
        const styleCss = path.resolve(__dirname, '../dist/assets/styles/style.css');
        const content = fs.readFileSync(styleCss, 'utf-8');

        fs.writeFileSync(fs.realpathSync(styleCss), beautify.css(content, this.options));
        this.info('Обработан CSS-файл на диске: style.css');
    }
}

module.exports = PostProductionPlugin;