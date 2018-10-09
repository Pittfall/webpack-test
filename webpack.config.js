// Webpack looks for this file when executing webpack or webpack-dev-server.

const path = require('path');

// node syntax.
module.exports = {
   devtool: 'cheap-module-eval-source-map', // Lets devs see readable code when debugging, rather than minified version.
   entry: './src/index.js', // Starting point.
   output: {
      path: path.resolve(__dirname, 'dist'), // Where output should be stored.
      filename: 'bundle.js', // The javascript files are bundled into this file.
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
         }
      ]
   }
};