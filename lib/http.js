const Express = require('express');
const App = Express();

App.use(Express.static('./assets'));

App.get('/', function (req, res) {
  res.sendfile('./assets/index.html');
});

module.exports = App;