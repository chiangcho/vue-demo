# vue-demo

当前工程移动到了load-server-component目录下，在查看commit记录时，注意这个大的变化。

## 从服务端加载组件
具体可见App.vue,加载后进行组件注册，但是好像其中涉及的`test2.json`内容不知道是什么


## 按需加载

引入vue-components-demo中`npm pack`的本地包，并在main.js中进行引入，在App.vue进行使用

1. 所用的组件在other_files下
2. 已经在main.js进行了注册
3. 在App.vue中直接使用`HellWorld`组件即可
