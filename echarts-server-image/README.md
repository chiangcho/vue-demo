使用phantomjs实现echarts在服务端的图片生成

参考地址：
```
https://www.cnblogs.com/jason0529/p/9392634.html
```
## 下载phantomjs.exe
由于phantomjs.exe有点大，因此未提交到仓库，需要另行下载，测试时使用的是`2.1.1`。下载地址
```
https://phantomjs.org/download.html
```

## 生成命令：
```sh
.\phantomjs.exe echarts-convert.js -infile option-map.js -outfile t.png
```

## 文件说明

| 文件 | 说明 |
| ---- | ---- |
| option.js | 普通图表的option文件 |
| option-map.js | 地图的option文件 |
| ecahrts-all4.js,echarts.js,echarts.min.js| 几种不同类型版本的echarts都是可以的，修改ecahrts-convert.js中的引用即可实现切换 |
| echarts-convert.js | 图表生成主要的调度执行文件 |
| map目录 | 其中包括全国及各省地图js，主要是地图信息 |

