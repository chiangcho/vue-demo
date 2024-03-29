module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "dynamic-import-source",{basePath:"~"}
    ],
    [
      "component",
      {
        // 组件库的名字，需要和 package.json 里的 name 相同
        libraryName: "xcom-components",
        // 存放组件的文件夹，如果不想配置此项，默认文件夹的名字为 lib
        libDir: "src/components",
      },
    ]
  ],
};
