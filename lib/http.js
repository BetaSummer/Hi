const Express = require('express');
const App = Express();
const Ejs = require('ejs');
const Fs = require('fs');
const Index = Ejs.render(Fs.readFileSync('./views/index.ejs').toString(), {
  expressions: Fs.readdirSync('./assets/expressions')
});

App.get('/hi', function (req, res) {
  res.end(Index);
});

App.use(Express.static('./assets'));

module.exports = App;