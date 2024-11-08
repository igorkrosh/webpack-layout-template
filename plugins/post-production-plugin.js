const beautify = require('simply-beautiful');
const path = require("path");
const glob = require("glob");
const fs = require("fs");

class PostProductionPlugin
{
    options = {
        indent_size: 4,
        space_before_conditional: true,
        jslint_happy: true,
        max_char: 0,
    }

    info(text)
    {
        console.log("\x1b[34m", text, "\x1b[0m");
    }

    constructor(options)
    {
        this.options = options;
    }

    apply(compiler)
    {
        compiler.hooks.done.tapAsync('PostProductionPlugin', (compilation, callback) => {
            if (compiler.options.mode === 'production')
            {
                this.info('Старт пост-обработки файлов');
                this.BeautifyHTML();
                this.BeautifyCSS();
                this.info('Пост-обработка файлов завершена');
            }
            callback();
        })

    }

    BeautifyHTML()
    {
        const buildFolder = path.resolve(__dirname, `../dist`);
        const htmlArray = glob.globSync(`${buildFolder}/*.html`);

        for (const htmlFile of htmlArray)
        {
            const filename = path.basename(htmlFile);
            const content = fs.readFileSync(htmlFile, 'utf-8');
            fs.writeFileSync(fs.realpathSync(htmlFile), beautify.html(content, this.options));
        }
    }

    BeautifyCSS()
    {
        const styleCss = path.resolve(__dirname, `../dist/assets/styles/style.css`);
        const content = fs.readFileSync(styleCss, 'utf-8');

        fs.writeFileSync(fs.realpathSync(styleCss), beautify.css(content, this.options));
    }
}

module.exports = PostProductionPlugin;