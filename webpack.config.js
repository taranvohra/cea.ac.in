const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = (env, options) => ({
  entry: ["./src/index.js"],
  devServer: {
    contentBase: "./dist"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          options.mode !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./img/"
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":src"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/about.html",
      inject: "body",
      filename: "about.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/administration.html",
      inject: "body",
      filename: "administration.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/contact.html",
      inject: "body",
      filename: "contact.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/studies/btech-computer-science-engg.html",
      inject: "body",
      filename: "studies/btech-computer-science-engg.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/studies/btech-mechanical-engg.html",
      inject: "body",
      filename: "studies/btech-mechanical-engg.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/studies/btech-electronics-and-communication-engg.html",
      inject: "body",
      filename: "studies/btech-electronics-and-communication-engg.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: options.mode === "production" ?'https://ceadoor.github.io/cea.ac.in/':'http://localhost:8080/'
  }
});
