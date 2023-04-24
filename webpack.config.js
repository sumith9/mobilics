const nodeExternals = require("webpack-node-externals")
const path = require("path")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// resolve: {
//   fallback: {
//     "fs": false,
//     "tls": false,
//     "net": false,
//     "path": false,
//     "zlib": false,
//     "http": false,
//     "https": false,
//     "stream": false,
//     "crypto": false,
//     "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
//   } 
// }


const typicalReact = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    }
  ]
}

const clientConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js"
  },
  mode: "development",
  module: typicalReact
}

const serverConfig = {
  entry: "./server.js",
  output: {
    path: __dirname,
    filename: "server-compiled.js"
  },
  externals: [nodeExternals()],
  target: "node",
  mode: "production",
  module: typicalReact
}

module.exports = [clientConfig, serverConfig]

// resolve.fallback: { "path": false }



// module.exports = {
//   plugins: [
//     new NodePolyfillPlugin()
//   ]
// };
