const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][hash].js",
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/i,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.css|sass|scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /(png|jpe?g|svg|webp|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "./img/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./public/peliculas.html",
      filename: "./peliculas.html",
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./public/series.html",
      filename: "./series.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets / [name][contenthash].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 3300,
    open: true,
  },
};
