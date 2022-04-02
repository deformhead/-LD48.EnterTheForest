const path = require('path');

const webpack = require('webpack');

function configuration() {

    return {

        'devServer': {

            'client': {

                'logging': 'warn'
            },
            'static': {

                'directory': path.resolve(__dirname, 'distribution')
            }
        },
        'devtool': 'inline-source-map',
        'entry': path.resolve(__dirname, 'index.js'),
        'mode': 'development',
        'output': {

            'path': path.resolve(__dirname, 'distribution'),
            'filename': 'index.js'
        },
        'plugins': [

            new webpack.DefinePlugin({

                __VUE_OPTIONS_API__: false,
                __VUE_PROD_DEVTOOLS__: false
            })
        ],
        'resolve': {

            'alias': {

                '@hypercubejs/hypercubejs': path.resolve(__dirname, '..', 'engine'),

                '@': path.resolve(__dirname, 'sources')
            }
        }
    };
}

module.exports = configuration;
