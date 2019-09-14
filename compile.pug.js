const fs            = require('fs');
const pug           = require('pug');
const argv          = require('yargs').argv;

const config        = require('./config.json').pugOptions;

let inputPath       = argv.source;
let outputPath      = argv.build;
let buildConfig     = { common: config.common, file: argv.config };

fs.readdir(inputPath, function(error, files) {
    let fileExists = Boolean(~files.indexOf(`${buildConfig.file}.pug`));
    if(!fileExists) {
        console.error('Pug file does not exist!');
    } else {
        const compile = pug.compileFile(`${inputPath}/${buildConfig.file}.pug`);

        let compiledHtml = compile({
            iconClose: buildConfig.common.iconClose,
            iconMinimize: buildConfig.common.iconMinimize,
            iconMaximize: buildConfig.common.iconMaximize,
            iconLoading: buildConfig.common.iconLoading,
            iconSettings: buildConfig.common.iconSettings,

            title: buildConfig[buildConfig.file].title
        })

        fs.writeFileSync(`${outputPath}/${buildConfig.file}.html`, compiledHtml);
    }
})
