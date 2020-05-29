const Path = require('path');
const NodeExternals = require('webpack-node-externals');
const SwaggerPlugin = require('@nestjs/swagger/plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


module.exports = {
    entry: ['./src/main/main.ts'],
    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: 'main/main.js'
    },
    mode: 'development',
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    externals: [NodeExternals()],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                }
            }],
            exclude: /node_modules/
        }]
    },
    optimization: {
        nodeEnv: false
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: []
    },
    plugins: [new CleanWebpackPlugin({
        verbose: true
    })]
};