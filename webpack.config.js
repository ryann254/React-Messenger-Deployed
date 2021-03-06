const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  output: {
    publicPath: "/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "chat",
      library: { type: "var", name: "chat" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Chat": "./src/Chat",
      },
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
