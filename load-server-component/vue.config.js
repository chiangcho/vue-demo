const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {
    console.log("-------------------------" + resolve(".."))
    config.resolve.alias.set("~", resolve(".."));
  },
};
