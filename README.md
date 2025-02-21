
# yxzq-utils-browser

`yxzq-utils-browser` 是一个工具库，支持在前端读取文件并直接上传，方便处理静态资源管理。

## 目录

- [安装](#安装)
- [使用](#使用)
  - [上传函数 uploadResource](#上传函数-uploadresource)
  - [获取上传后文件地址函数 getFilePath](#获取上传后文件地址函数-getfilepath)
- [返回值](#返回值)
- [使用介绍](#使用介绍)
  - [文件支持](#文件支持)
- [后端工具](#后端工具)
- [搭配工具](#搭配工具)

## 安装

```bash
npm install yxzq-utils-browser
```

## 使用

### 上传函数 uploadResource

#### 原生js使用示例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>example</title>
</head>

<body>
    <input type="file" class="file-input">
    <script type="module" src="your-path-to-node_modules/yxzq-utils-browser/dist/dist-umd/index.js"></script>
    <script type="module">
        const input = document.querySelector('.file-input')
        input.addEventListener('change', (e) => {
            const file = e.target.files[0]
            yxzqUtils.uploadResource(file).then(res => {
                console.log(res)
            })
        })
        
    </script>
</body>

</html>
```

#### JavaScript 示例

```javascript
import { uploadResource } from 'yxzq-utils';

const up = (e) => {
    if (e.target.files) {
        const file = e.target.files[0];
        uploadResource(file, {
            fileName: 'default',        // 储存的文件名，默认值为 'default'
            folderName: 'default_name', // 储存的目录位置，默认值为 'default_name'
            url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
            useDate: 'yes',            // 是否使用时间戳作为文件名的一部分，默认值为 'yes'
            ext: 'jpg'                 // 文件后缀名，默认值为 'jpg'
        });
    }
};

up();
```

#### TypeScript 示例

```typescript
import { uploadResource } from 'yxzq-utils';

const up = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
        const file = target.files[0];
        uploadResource(file, {
            fileName: 'default',        // 储存的文件名，默认值为 'default'
            folderName: 'default_name', // 储存的目录位置，默认值为 'default_name'
            url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
            useDate: 'yes',            // 是否使用时间戳作为文件名的一部分，默认值为 'yes'
            ext: 'jpg'                 // 文件后缀名，默认值为 'jpg'
        });
    }
};

up();
```

#### CommonJS 支持

```javascript
const { uploadResource } = require('yxzq-utils');
```

### 获取上传后文件地址函数 getFilePath

#### 原生js使用示例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>example</title>
</head>

<body>
    <input type="file" class="file-input">
    <script type="module" src="your-path-to-node_modules/yxzq-utils-browser/dist/dist-umd/index.js"></script>
    <script type="module">
        const input = document.querySelector('.file-input')
        input.addEventListener('change', (e) => {

            yxzqUtils.getFilePath().then(res => {
                console.log(res)
            })
        })
        
    </script>
</body>

</html>
```

#### JavaScript 示例

```javascript
import { getFilePath } from 'yxzq-utils';

getFilePath({
     url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
     extNameConfig:'all',// 查询文件后缀名参数,默认值为'all',可选值'photo',也可传入后缀名数组,如['.html','.jpg']
}).then(res => {
 console.log(res)
)
```

#### TypeScript 示例

```typescript
import { getFilePath } from 'yxzq-utils';

getFilePath({
     url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
     extNameConfig:'all',// 查询文件后缀名参数,默认值为'all',可选值'photo',也可传入后缀名数组,如['.html','.jpg']
}).then(res => {
 console.log(res)
)
```

#### CommonJS 支持

```javascript
const { getFilePath } = require('yxzq-utils');
```

### 返回值

调用 `uploadResource` 会返回一个 `Promise`，解析后的结果如下：

```javascript
{
    message: 'File uploaded successfully!' | 'File uploaded unsuccessfully!' | 'File does not exist!',
    filePath: url | null, // 文件路径（成功时）或 null（失败时）
    code: 200 | 500,      // HTTP 状态码
    error?: error.message // 错误信息（仅在失败时返回）
}
```

调用 `getFilePath` 会返回一个 `Promise`，解析后的结果如下：

```javascript
{
    message: 'Query successful!' | 'An error occurred during the request',
    files: Array<string> | [], // 文件路径（成功时）或 []（失败时）
    code: 200 | 400,      // HTTP 状态码
    error?: error.message // 错误信息（仅在失败时返回）
}
```

## 使用介绍

### 文件支持

当前工具支持以下文件类型：
- **File**
- **Blob**

你可以上传图片或其他静态资源。

## 后端工具

如果需要在 Node.js 后端环境中使用，请参考另一个工具 [yxzq-utils-node](https://www.npmjs.com/package/yxzq-utils-node)。

## 搭配工具

在使用 `yxzq-utils-browser` 时，你可以结合作者的另一个工具 [resource-storage](https://github.com/SupremacySakura/resource-storage)，以实现更高效的资源存储和管理。

---

如有任何问题，欢迎提交 Issue 或 PR！
