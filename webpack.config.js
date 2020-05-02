//entry -> output
//here we specify the entry and output for webpack to bundle
const path=require('path');
//console.log(path.join(__dirname,'Public'));

module.exports={
    entry: './src/app.js',
    output:{
        path: path.join(__dirname, 'Public'),
        filename: 'bundle.js'
    },
module: {
  rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
  },
   {
     test: /\.s?css$/,
     use: ['style-loader', 'css-loader', 'sass-loader']
   }]        
        
},
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'Public'),
        historyApiFallback:true
    }
    
};