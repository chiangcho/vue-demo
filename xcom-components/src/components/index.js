// 导入所有组件
import HelloWorld from './helloworld'

const components = [
  HelloWorld
]

const install = function(vue) {
  /* istanbul ignore if */
  if (install.installed) return;
  /*eslint-disable*/
  components.map((component) => {
    vue.component(component.name, component); //component.name 此处使用到组件vue文件中的 name 属性
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  HelloWorld
}

export default {
  install,
  HelloWorld
}

