
module.exports = {
    entry: './index.js',
    output: {
        path: './assets',
        filename: 'bundle.js',
        publicPath: '/assets'
    },
    module: {
        loaders: [
            {
                test: /.(js|jsx)$/,
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