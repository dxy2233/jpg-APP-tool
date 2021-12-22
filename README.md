# jpg-APP-tool
一个简单截取、修改jpg图片APP信息的工具库，没有任何依赖，导出若干函数

## 安装

```bash
npm install jpg-app-tool
```
```bash
yarn add jpg-app-tool
```

## 使用
```js
import { sliceAPP1, getAPP1 } from 'jpg-app-tool'
```

## 函数说明

### sliceAPP1(dataView, resetOrientation)
截取jpg图片的APP1字段以Blob格式返回
* `dataView` \<DataView> jpg的DataView格式
* `resetOrientation` \<Boolean> 若exif存在orientation字段，是否编辑为1
* 返回：如果存在APP1字段则返回APP1的Blob对象，没有则返回null

### getAPP1(file, resetOrientation) 
截取jpg图片的APP1字段以Blob格式返回
* `file` \<File> jpg文件
* `resetOrientation` \<Boolean> 是若exif存在orientation字段，是否编辑为1
* 返回：如果存在APP1字段则返回APP1的Blob对象，没有或不是jpg文件则返回null

### padGetAPP1(file) 
截取jpg图片的APP1字段以Blob格式返回，若exif存在orientation字段则编辑为1，jpg编码缺少结尾标识则自动填补
* `file` \<File> jpg文件
* 返回：返回一个数组 [a,b]
	* a: 如果存在APP1字段则返回APP1的Blob对象，没有或不是jpg文件则返回null
	* b: 如果jpg文件编码缺少结尾标识，则添加后返回新的Blob对象，已有或不是jpg文件则返回null
