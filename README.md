# Hi

The chat room based on socket.io

## Make Dev

0.) Before，修改 `assets/js/script.js` 中第二行：

```javascript
var socket = io.connect('http://{你的主机IP}:3000/group-chat');
```
主机IP最好填你电脑在局域网中的IP（比如：192.168.1.100）,这样方便其他设备的调试，若填 `localhost` 或 `127.0.0.1` 只在主机上调试了...

1.) Run service:

```bash
npm run dev
```

2.) Access service:

```bash
http://127.0.0.1:3000/hi
```

## Contribution

More on [issue](https://github.com/BetaSummer/Hi/issues)

开发记录，详见 [wiki](https://github.com/BetaSummer/Hi/wiki)

## License

MIT