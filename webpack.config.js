<<<<<<< HEAD
//entry -> output
//here we specify the entry and output for webpack to bundle
const path=require('path');
//console.log(path.join(__dirname,'public'));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    //console.log("env", env)
    
    const isProduction = env === 'production';
    const MiniCssExtract = new MiniCssExtractPlugin({
      filename: 'styles.css'  
    }) //extracting all css files to one file styles.css
    
    return {
    entry: './src/app.js',
    output:{
        path: path.join(__dirname, 'public'),
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
     use: [MiniCssExtractPlugin.loader, 
           {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
           },
           {
               
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
               
           },
            
           ]
   }]        
        
},
plugins:[
         MiniCssExtract
        ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback:true
    }
    
}
    
    
}
=======
//entry -> output
//here we specify the entry and output for webpack to bundle
const path=require('path');
//console.log(path.join(__dirname,'public'));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    //console.log("env", env)
    
    const isProduction = env === 'production';
    const MiniCssExtract = new MiniCssExtractPlugin({
      filename: 'styles.css'  
    }) //extracting all css files to one file styles.css
    
    return {
    entry: './src/app.js',
    output:{
        path: path.join(__dirname, 'public'),
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
     use: [MiniCssExtractPlugin.loader, 
           {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
           },
           {
               
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
               
           },
            
           ]
   }]        
        
},
plugins:[
         MiniCssExtract
        ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback:true
    }
    
}
    
    
}
>>>>>>> e1b7d64bdaa0e51d4b19d448d0c4f75b5a0691ed
