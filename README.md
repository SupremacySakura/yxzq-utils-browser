
# yxzq-utils-browser

## 目录

- 简介
- 安装
- 模块格式
- 实用函数
  - checkIfInstanceOf
  - debouncing
  - throtting
- 特别工具
  - 搭配工具
  - uploadResource
  - getFilePath
- 其他

## 简介

`yxzq-utils-browser` 是一个工具库，提供一些常见的 JavaScript 工具，旨在提升前端开发效率。它支持文件读取并直接上传，方便静态资源的管理和处理。（需配合作者的另一个工具包使用）

## 安装

### NPM 安装

```bash
npm install yxzq-utils-browser
```

### 原生 JS 引入

```html
<script src="your-path-to-node_modules/yxzq-utils-browser/dist/dist-umd/index.js"></script>
```

### 框架中使用

```javascript
// 全局导入
import yxzqUtils from 'yxzq-utils-browser'
// 按需导入
import {} from 'yxzq-utils-browser'
```

## 模块格式

`yxzq-utils-browser` 提供三种模块格式：

- ESM (ES Modules)
- CJS (CommonJS)
- UMD (Universal Module Definition)

## 实用函数

### checkIfInstanceOf

检查给定的对象是否是指定构造函数的实例。

```typescript
checkIfInstanceOf(obj: any, classFunction: any)
```

#### 参数

- `obj`: 任意被检查的对象
- `classFunction`: 构造函数

#### 返回值

- `boolean`: 返回检查的结果，如果对象是提供的构造函数的实例，则返回 `true`；否则返回 `false`。如果 `classFunction` 不是一个函数，则返回 `false`。

#### 例子

```typescript
yxzqUtils.checkIfInstanceOf(button, HTMLButtonElement)
// => true

yxzqUtils.checkIfInstanceOf('a', Number)
// => false
```

### debouncing

创建一个防抖函数，该函数在指定的时间间隔内仅执行一次 `func`。

```typescript
debouncing<T extends Function>(func: T, wait: number)
```

#### 参数

- `func`: 需要进行防抖处理的函数。
- `wait`: 等待的时间间隔（毫秒），在此期间如果没有新的触发，则执行 `func`。

#### 返回值

- `Function`: 返回一个新的函数，该函数实现了防抖逻辑。

#### 例子

```typescript
const debouncedFunc = debouncing((message: string) => console.log(message), 1000);
debouncedFunc('Hello'); // 在1000毫秒后执行
debouncedFunc('World'); // 如果在1000毫秒内再次调用，则重置计时器
// => World
```

### throtting

创建一个节流函数，该函数确保在给定的时间间隔内最多执行一次 `func`。

```typescript
throtting<T extends Function>(func: T, limit: number)
```

#### 参数

- `func`: 需要进行节流处理的函数。
- `limit`: 时间间隔（毫秒），在此期间内最多执行一次 `func`。

#### 返回值

- `Function`: 返回一个新的函数，该函数实现了节流逻辑。

## 特别工具

### 搭配工具

在使用 `yxzq-utils-browser` 时，你可以结合作者的另一个工具 [resource-storage](https://github.com/SupremacySakura/resource-storage)，以实现更高效的资源存储和管理。

### uploadResource

异步上传文件到指定 URL。（此工具需配合作者其他工具 `resource-storage` 使用）

```typescript
uploadResource(file: File | Blob, [config]: UploadConfig)
```

#### 参数

- `file`: 要上传的文件，可以是 `File` 或 `Blob` 类型。
- `config`: 配置对象，用于自定义上传行为
  - `folderName`: 文件将被存储的文件夹名称，默认值为 `'default'`。
  - `fileName`: 上传文件的名称，默认值为 `'default_name'`。
  - `url`: 上传的目标 URL，默认值为 `'http://localhost:3100'`。
  - `useDate`: 是否在文件名中使用日期前缀，支持 `'yes'` 或 `'no'`。
  - `ext`: 文件扩展名。如果文件名没有后缀，则使用此扩展名，默认值 `'jpg'`。

#### 返回值

- `Promise<UploadResult>`: 返回一个 Promise，解析为包含上传结果的对象：
  - `message`: 描述信息
  - `error`: 错误信息（如果有）
  - `filePath`: 文件路径（成功时）或 `null`（失败时）
  - `code`: HTTP 状态码或错误代码

#### 例子

```typescript
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

### getFilePath

异步获取文件路径。（此工具需配合作者其他工具 `resource-storage` 使用）

```typescript
getFilePath([config]: GetFilePathConfig)
```

#### 参数

- `config`: 配置对象，用于自定义请求行为
  - `url`: 请求的目标 URL，默认值为 `'http://localhost:3100'`
  - `extNameConfig`: 文件扩展名配置，默认值为 `'all'`，可选值 `'photo'`，也可传入后缀名数组，如 `['.html', '.jpg']`

#### 返回值

- `Promise<GetFilePathResult>`: 返回一个 Promise，解析为包含获取结果的对象：
  - `message`: 描述信息
  - `files`: 包含文件路径的数组（成功时）或空数组（失败时）
  - `code`: HTTP 状态码或错误代码
  - `err`: 错误信息（如果有）

#### 例子

```typescript
getFilePath({
     url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
     extNameConfig: 'all', // 查询文件后缀名参数，默认值为 'all'，可选值 'photo'，也可传入后缀名数组，如 ['.html', '.jpg']
}).then(res => {
    console.log(res);
});
```

## 其他

### 后端工具

如果需要在 Node.js 后端环境中使用，请参考另一个工具 [yxzq-utils-node](https://www.npmjs.com/package/yxzq-utils-node)。

如有任何问题，欢迎提交 Issue 或 PR！

作者联系地址: 3118654731@qq.com
