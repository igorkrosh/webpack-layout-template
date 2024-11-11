class DebugAliasPlugin
{
    info(text)
    {
        console.log("\x1b[34m", text, "\x1b[0m");
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tapAsync('AliasLoggerPlugin', (compilation, callback) => {
            const resolver = compiler.resolverFactory.get('normal');
                this.info('Доступные алиасы:');
                for (const alias of resolver.options.alias)
                {
                    this.info(`${alias.name}: ${alias.alias}`);
                }

            callback();
        });
    }
}

module.exports = DebugAliasPlugin;