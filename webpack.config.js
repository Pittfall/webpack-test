// Webpack looks for this file when executing webpack or webpack-dev-server.

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// node syntax.
module.exports = {
   devtool: 'cheap-module-eval-source-map', // Lets devs see readable code when debugging, rather than minified version.
   entry: './src/index.js', // Starting point.
   output: {
      path: path.resolve(__dirname, 'dist'), // Where output should be stored.
      filename: 'bundle.js', // The javascript files are bundled into this file.
      chunkFilename: '[id].js', // Generated code splitting file names.
      publicPath: '' // Empty string means root folder meaning the file structure we have here is the output/deployed file structure.
   },
   resolve: {
      extensions: ['.js', '.jsx'] // This will try to auto resolve imports of this file type without needing to type them in.
   },
   module: {  // What webpack should do with each file.
      rules: [
         {
            test: /\.js$/, // Test if a file fulfils criteria. ex. Ends with .js.
            loader: 'babel-loader', // The package that does the work.
            exclude: /node_modules/ // Don't transform anything in node modules because they have already been optimized and transformed.
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [ // Use is like 'loader' but a more complex setup than just defining a pacakge.
               // 'use' parses loaders from right to left. 'css-loader' must be first because it has to first understand what the css
               // loaders are.  Then 'style-loader' is applied on extracted css code.
               { loader: 'style-loader' }, // Extract css from css files and inject at top of html file so file downloads are reduced. 
               { 
                  loader: 'css-loader', // Tells webpack what to do with css imports
                  options: { // Configure loader.
                     importLoaders: 1, // 'css-loaders' needs to know if anything runs before it. The number of things to run before.
                     modules: true, // Enable css modules
                     localIdentName: '[name]__[local]_[hash:base64:5]' // make a unique name
                  }
               },
               {
                  loader: 'postcss-loader', // Transforms css
                  options: {
                     ident: 'postcss',
                     plugins: () => [ // Steps to apply to transform everything.
                        autoprefixer({ // auto prefixes css properties.
                           browsers: [ // The browser configuration for what to prefix for.
                              "> 1%",
                              "last 2 versions"
                           ]
                        })
                     ]
                  }
               }
            ]
         },
         {
            test: /\.(png|jpg?g|gif)$/, // The files we want to support.
            // Take images and convert them to data64 urls which it can inline and we don't have to download file.  Files above certain limit,
            // will be downloaded for efficieny. 'file-loader' is a package used to copy images.
            loader: 'url-loader?limit=8000&name=images/[name].[ext]' // Only copy images if the size exceeds 8000 bytes to an images path.
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: __dirname + '/src/index.html',
         filename: 'index.html',
         inject: 'body',
      })
   ]
};