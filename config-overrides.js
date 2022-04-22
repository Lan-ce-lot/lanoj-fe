const {
  override,
  fixBabelImports,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
process.env.CI = "false";
// const addCustomize = () => (config) => {
//   if (config.output.publicPath) {
//     config.output.publicPath =
//       process.env.NODE_ENV === "production"
//         ? "/react-antd-admin-template/"
//         : "/";
//   }
//   if (config.resolve) {
//     config.resolve.extensions.push(".jsx");
//   }
//   return config;
// };
module.exports = override(
  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // 自动打包相关的样式
  }),


  // 配置路径别名
  addWebpackAlias({
    "@": resolve("src"),
  }),
  // addCustomize()
);
