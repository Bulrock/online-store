/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
    products: path.resolve(__dirname, "./src/pages/products/index.ts"),
    404: path.resolve(__dirname, "./src/pages/error/index.ts"),
    cart: path.resolve(__dirname, "./src/pages/cart/index.ts"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".html"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "./src/pages/products/index.html"),
      filename: "products.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "./src/pages/cart/index.html"),
      filename: "cart.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "./src/pages/error/index.html"),
      filename: "404.html",
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: "ts" }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/.htaccess",
        },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(config, envConfig);
};
