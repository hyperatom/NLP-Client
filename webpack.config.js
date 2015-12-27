
module.exports = {
    entry: './index.jsx',
    output: {
        path: './assets',
        filename: 'bundle.js',
        publicPath: '/assets'
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