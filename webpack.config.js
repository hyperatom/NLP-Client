
module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js',
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};