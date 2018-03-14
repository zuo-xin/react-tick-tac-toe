const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry:{
        main:path.resolve(__dirname,'./src/index.js'),
        vendor:['react','react-dom']
    },
    output:{
        filename:'bundle-[hash].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                include:[
                    path.resolve(__dirname,'src')
                ],
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['es2015','react']
                    }
                }
            },{
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                module:true,
                                minimize:true
                            }

                        },{
                            loader:"postcss-loader"
                        },{
                            loader:"sass-loader"
                        }
                    ]
                })
            },{
                test:/\.(png|gif|jpg|jpeg|bmp)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8192
                        }
                    }
                ]
            }
        ]
    },
    devtool:"source-map",
    devServer: {
        port: 2918,
        host: '0.0.0.0',
    },
    // optimization:{
    //     minimize:true
    // },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            filename:"vendor.js"
        }),
        new HtmlWebpackPlugin({
            template:__dirname + '/index.tmpl.html'
        }),
        new ExtractTextPlugin("style.css")
        //new CleanWebpackPlugin(['dist']),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings:false
        //     }
        // })
    ]
}