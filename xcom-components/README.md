# xcom-components 基于vue-cli的组件打包demo

### 打包配置
通过vue-cli的命令进行打包，未直接配置webpack配置文件,主要是修改`package.json`文件，包括`script`,`files`,`main`,`style`,`private`

添加`script`
```js
"build-bundle": "vue-cli-service build --target lib --name xcom-components ./src/components/index.js"
```

`files`设置要打包的文件
```js
"files": [
    "dist",
    "src/components"
  ],
```

通过`main`设置入口`js`
```js
"main":"./dist/xcom-components.common.js",
```

设置`style`
```js
"style": "./dist/xcom-components.css"
```

修改`private`为`false`
```js
"private": false,
```

### 内联css设置
在`vue.config.js`中增加
```js
module.exports = {
    ...
    css: { extract: false }
    ...
}
```
### 编写组件
在src下建立`components`目录，所有的组件在该目录下的独立的目录下，每个组件包含一个`.vue`和一个`index.js`文件，在`components`下建立一个总的`index.js`入口文件

### 执行脚本
构建
```
npm run build-bundle
```

发布到npm仓库
```
npm publish
```

### 本地测试
可以使用`pack`命令打一个本地的组件包,在工程根目录下的一个压缩包
```
npm pack
```

然后组件使用方在工程根目录下安装本地组件,安装后即可使用
```
npm i F:\git\my-vue-library\xcom-components-0.1.0.tgz
```

## 按需加载

添加`babel-plugin-component`插件,其中`-D`is the shortcut for: `--save-dev`,Package will appear in your `devDependencies`.
```
npm i babel-plugin-component -D
```

配置`.babelrc`，在项目的根目录下创建一个 .babelrc 的文件,也可以将以下内容添加到`babel.config.js`中，将`plugins`与`presets`并列
```js
{
  "plugins": [
    [
      "component",
      {
        // 组件库的名字，需要和 package.json 里的 name 相同
        "libraryName": "xcom-components",
        // 存放组件的文件夹，如果不想配置此项，默认文件夹的名字为 lib
        "libDir": "src/components",
      }
    ]
  ]
}

```

修改整体的入口js文件，增加export部分，跟export default一样
```js
export {
  install,
  HelloWorld
}

export default {
  install,
  HelloWorld
}

```

## 按需加载使用
组件的使用方，不需要特殊设置，只需要部分import即可,例如在main.js中
```
import {HelloWorld} from 'xcom-components'

Vue.component('HelloWorld',HelloWorld)
//也可以使用组件的名字
//Vue.component(HelloWorld.name,HelloWorld)

//如果组件下的index.js中定义了install方法，则也可以使用Vue.use
//Vue.use(HelloWorld)
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
