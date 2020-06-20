[![npm version](https://img.shields.io/npm/v/super-editor.svg?style=flat)](https://www.npmjs.com/package/super-editor)

基于 React 与 Slate 的乐高积木式编辑器

## 为什么使用 slate

- slate 借鉴了 Draft，ProseMirror 和 Quill 的优点
- 所有逻辑都是通过一系列插件实现的，因此永远不会受到束缚
- 交互方式完全与 React 相同，使用 setState 渲染流程，slate 没有自建 view 层，完全拥抱 react
- 序列化机制，可避免了文档错乱
- 源码边界清晰

## API

- value: 文本内容，Node 类型
- onChange: 编辑文本内容
- placeholder: 文本内容 placeholder
- title: 标题
- onTitleChange: 编辑标题
- titlePlaceholder: 标题 placeholder
- uploadConfig: 图片上传对象

  - action: 上传地址
  - name: 字段 key
  - method: 请求方式
  - beforeUpload: 上传前判断
  - transformURL: 图片 url 转换
  - headers: 请求头部信息
  - data: 请求额外 body

- escapeHTML: Node 转换为 HTML
- deEscapeHTML: HTML 转换为 Node(TOTO)
- deserialize: string 转换为 Node
- serialize: Node 转换为 string
- createUploadFormData: 构建 FormData
- file2Base64: File 对象转换为 base64

## DEMO

```
import React, {useState} from "react"
import SuperEditor from "super-editor"
import "super-editor/dist/index.css";

const Index = () => {
    const [value,setValue] = setState([{ type: "paragraph", children: [{ text: "" }]])
    return <SuperEditor value={value} onChange={setValue} />
}
```

## TODO

- 支持 ssr
- 支持 markdown 语法
- 丰富 toolbar
- 支持移动端

### 如果觉得的还不错的话就来波 star 吧 o(￣ ▽ ￣)ｄ，欢迎各位老板们的 issue.
