const path = require('path');
const glob = require('glob');
const fs = require('fs');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

class Ttf2WoffPlugin
{
    mixinFontFace = `@mixin FontFace($fontFamily, $fileName, $weight, $style)
{
    @font-face {
        font-family: $fontFamily;
        font-display: swap;
        src: url("#{$fileName}.woff") format("woff"), url("#{$fileName}.woff2") format("woff2");
        font-weight: #{$weight};
        font-style: #{$style};
    }
}
`
    constructor(options)
    {
        this.options = options;
    }

    info(text)
    {
        console.log("\x1b[34m", text, "\x1b[0m");
    }

    fontConverter(fontFile, outputFolder)
    {
        const dirName = path.basename(path.dirname(fontFile));
        const filename = path.basename(fontFile, '.ttf');
        const outputPath = path.join(outputFolder, dirName);

        const fontWoffPath = path.join(outputPath, `${filename}.woff`);
        const fontWoffExist = fs.existsSync(fontWoffPath);

        const fontWoff2Path = path.join(outputPath, `${filename}.woff2`);
        const fontWoff2Exist = fs.existsSync(fontWoff2Path);

        if (!fs.existsSync(outputFolder))
            fs.mkdirSync(outputFolder);
        if (!fs.existsSync(outputPath))
            fs.mkdirSync(outputPath);

        if (!fontWoffExist)
        {
            const content = fs.readFileSync(fontFile);
            fs.writeFileSync(fontWoffPath, ttf2woff(content));
        }

        if (!fontWoff2Exist)
            fs.writeFileSync(fontWoff2Path, ttf2woff2(fontFile));

        const filenameLower = filename.toLowerCase();

        let weight = 400;
        let style = filenameLower.includes('italic') ? 'italic' : 'regular';

        if (filenameLower.includes('thin'))
            weight = 100;
        if (filenameLower.includes('extralight'))
            weight = 200;
        if (filenameLower.includes('light'))
            weight = 300;
        if (filenameLower.includes('medium'))
            weight = 500;
        if (filenameLower.includes('semibold'))
            weight = 600;
        if (filenameLower.includes('bold'))
            weight = 700;
        if (filenameLower.includes('extrabold'))
            weight = 800;
        if (filenameLower.includes('black'))
            weight = 900;

        return {
            fontFamily: dirName,
            filePath: `@assets/fonts/converted/${dirName}/${filename}`,
            weight: weight,
            style: style
        }
    }

    createFontFace(fontsFaceArray)
    {
        let content = '';
        let fileExists = false;
        
        try {
            content = fs.readFileSync(this.options.fontStyleFile, 'utf8');
            fileExists = true;
            this.info(`Файл стилей шрифтов уже существует`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.info(`Файл стилей шрифтов не найден, будет создан`);
            } else {
                this.error(`Ошибка при чтении файла стилей шрифтов: ${error.message}`);
                return;
            }
        }

        if (fileExists && content.trim()) {
            this.info(`Файл стилей шрифтов уже содержит стили`);
            return;
        }

        let fontStyle = this.mixinFontFace;

        for (const fontData of fontsFaceArray)
        {
            fontStyle += `@include FontFace("${fontData.fontFamily}", "${fontData.filePath}", "${fontData.weight}", "${fontData.style}");\n`
        }

        const dir = path.dirname(this.options.fontStyleFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            this.info(`Создана директория: ${dir}`);
        }

        fs.writeFileSync(this.options.fontStyleFile, fontStyle);

        this.info(`Файл стилей шрифтов сгенерирован`);
    }

    apply(compiler)
    {
        compiler.hooks.beforeRun.tapAsync('Ttf2WoffPlugin', (compilation, callback) => {
            try
            {
                this.info('Запуск конвертации шрифтов из TTF в WOFF и WOFF2 форматы')

                const fontFolder = path.resolve(__dirname, `../assets/fonts`);
                const outputFolder = path.resolve(__dirname, `../assets/fonts/converted`);
                const fontsArray = glob.globSync(`${fontFolder}/*/*.ttf`);
                const fontsFaceArray = [];

                for (const fontFile of fontsArray)
                {
                    const font = this.fontConverter(fontFile, outputFolder);
                    fontsFaceArray.push(font)
                }

                this.info('Все шрифты обработаны')

                this.createFontFace(fontsFaceArray);
            }
            catch (err)
            {
                console.log("\x1b[41m", err, "\x1b[0m");
            }

            callback();
        })
    }
}

module.exports = Ttf2WoffPlugin;