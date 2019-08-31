"use strict";

var DefinePlugin = require("webpack").DefinePlugin;
const path = require('path');

module.exports = env => {

    const envConfig = Object.keys(env)[0] === 'dev' ? new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }) : new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    });

    return {
        entry:{
            "Ventee":["babel-polyfill", "./app/Index.tsx"]
        },
        output: {
            path:  path.resolve(__dirname, "."),
            filename: "./dist/[name].js",
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: "./lib"
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    loader: "babel-loader!ts-loader"
                },                        
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: ['react', 'es2015']
                    }
                },   
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
        },
        devtool: "sourcemap",
        plugins:[
            envConfig
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".css"]
        },
        devServer:{
            contentBase: "./",
            port: 8888
        }
    }
}