# jpg-APP-tool

一个简单截取、修改 jpg 图片 APP 信息的工具库，没有任何依赖，导出若干函数

## 安装

```bash
npm install jpg-app-tool
```

```bash
yarn add jpg-app-tool
```

## 使用

```js
import { sliceAPP1, getAPP1 } from "jpg-app-tool";
```

## 函数说明

### sliceAPP1(dataView, resetOrientation)

截取 jpg 图片的 APP1 字段以 Blob 格式返回

- `dataView` \<DataView> jpg 的 DataView 格式
- `resetOrientation` \<Boolean> 若 exif 存在 orientation 字段，是否编辑为 1
- 返回：
  ```js
  {
  	APP1, // APP1的blob对象
  	orientation, // 方向值
  }
  ```

### getAPP1(file, resetOrientation)

截取 jpg 图片的 APP1 字段以 Blob 格式返回

- `file` \<File> jpg 文件
- `resetOrientation` \<Boolean> 是若 exif 存在 orientation 字段，是否编辑为 1
- 返回：如果存在 APP1 字段则返回 APP1 的 Blob 对象，没有或不是 jpg 文件则返回 null

### padGetAPP1(file)

截取 jpg 图片的 APP1 字段以 Blob 格式返回，若 exif 存在 orientation 字段则编辑为 1，jpg 编码缺少结尾标识则自动填补

- `file` \<File> jpg 文件
- 返回：
  ```js
  {
  	APP1, // APP1的blob对象
  	orientation, // 方向值
  	newFile, // 如果缺少结尾标识则补位后反回新的blob对象
  }
  ```
