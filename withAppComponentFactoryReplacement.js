// withAppComponentFactoryReplacement.js
const { withAndroidManifest } = require('@expo/config-plugins');

function withAppComponentFactoryReplacement(config) {
    return withAndroidManifest(config, config => {
        const manifest = config.modResults;
        const application = manifest.manifest.application[0];
        if (application) {
            // Assegura que o namespace tools esteja definido na tag <manifest>
            if (!manifest.manifest.$['xmlns:tools']) {
                manifest.manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
            }
            // Adiciona o atributo para substituir o appComponentFactory
            application.$['tools:replace'] = 'android:appComponentFactory';
        }
        return config;
    });
}

module.exports = withAppComponentFactoryReplacement;
