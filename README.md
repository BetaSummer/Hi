## hi

The chat room based on socket.io

## 约定

- 常量大驼峰（每个单词的第一个字母都大写）
- 变量小驼峰（第一个单词首字母小写，后面其他单词首字母大写）
- 2空格缩进

## 预计实现

- 限制在线人数
- 长时间未发言自动退出

## 定义 Socket 事件

c 代表客户端触发(Client); s 代表服务端触发(Server).

- (c/s)-words  文字交流
- (c/s)-photo  图片交流
- (c/s)-file  文件交流

eg:

```javascript
// c-words / s-wods:

{
  chatter: {
    logo: 'url...',
    name: 'world'
  }
  words: 'hello'
}
```