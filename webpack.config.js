const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const autoprefixer = require("autoprefixer");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },

  entry: path.resolve(__dirname, "src", "index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[name][ext]",
  },

  plugins: [
    new HtmlWebpackPlugin({ title: "Fishing Hub" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new ESLintPlugin({ extensions: "ts", emitWarning: false }),

    new StylelintPlugin({
      configFile: "./.stylelintrc",
      files: "**/*.scss",
      fix: true,
    }),
    new DotenvWebpackPlugin(),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
