# Hi

![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

The chat room based on socket.io

## Make Dev


.1) First clone 'Hi' to the local:

```bash
git clone https://github.com/BetaSummer/Hi.git
```

2.) Then install dependences:

```bash
npm install
```

3.) Finall Run it  & Access service:

①：Before

修改 `assets/js/script.js` 中第二行：

```javascript
var socket = io.connect('http://{你的主机IP}:3000/group-chat');
```
主机IP最好填你电脑在局域网中的IP（比如：192.168.1.100）,这样方便其他设备的调试，若填 `localhost` 或 `127.0.0.1` 只在主机上调试了...

②：Run

```bash
npm run dev
```

③：Access

```bash
http://127.0.0.1:3000/hi
```

## Contribution

More on [issue](https://github.com/BetaSummer/Hi/issues)

开发记录，详见 [wiki](https://github.com/BetaSummer/Hi/wiki)

## License

MIT