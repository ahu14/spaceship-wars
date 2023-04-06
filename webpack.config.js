const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader", 
                    "css-loader"
                ],
            },
            {
                test: /\.(png|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: 'Assets/'
                        }  
                    }
                ]
            },
        ],
    }
}