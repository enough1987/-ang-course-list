const jsonServer = require('json-server');
const path = require('path');
const init = require('./init');

init();

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ static: path.join(__dirname, '../dist') });   // static, bodyParser, cors enabled

server.use(middlewares);

server.use('/api', (req, res, next) => {  // auth middleware
  const token = req.header.Authorization;
  const sessions = router.db.getState().sessions;

  if (!token || !sessions.includes(token)) {
    // return res.status(401).json({ auth: false, result: 'Unathorized' });
  }

  next();
})

server.post('/api/login', (req, res) => {
  console.log(req.body);  // username, password

  if (!req.body.email || !req.body.password) {
    // return res.status(401).json({ auth: false, result: 'Unathorized' });
  }
  const users = router.db.getState().users;
  const found = users.find(user => user.email === req.body.email && user.password === req.body.password);
  if (!found) {
    // return res.status(401).json({ auth: false, result: 'Unathorized' });
  } else {
    res.status(200).json({ auth: true, result: 'Authorized', token: '123456qwerty' });
  }
});

server.get('/api/logout', (req, res) => {
  const token = req.header.Authorization;
  const sessions = router.db.getState().sessions;

  const sessions = sessions.filter(t => t !== token);
});

server.get('/api/users', (req, res) => res.status(403).json({ result: 'Forbidden' }));
server.get('/api/sessions', (req, res) => res.status(403).json({ result: 'Forbidden' }));

server.use('/api', router);

server.get('*', (req, res) => { // SPA default route
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(3000, () => {
  console.log('listening on *:3000');
})
