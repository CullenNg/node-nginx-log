var path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.vue']
    },
    entry: {
        index: './source/main.js'
    },
    output: {
        path: path.join(__dirname, './develop/js/'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }, 
            { test: /\.vue$/, loader: 'vue' }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    babel: {
        "presets": ["es2015", "stage-0"],
        "plugins": ["transform-runtime"]
    }
}
