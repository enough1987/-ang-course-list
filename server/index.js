const jsonServer = require('json-server');
const path = require('path');
const init = require('./init');

init();

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '../dist'),
  bodyParser: true,  // json-server docs lie about bodyParser being true by default, https://github.com/typicode/json-server/issues/781
});

server.use(middlewares);

server.post('/api/login', (req, res) => {   // /api/login should be accessible while before authorization
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ auth: false, result: 'Unauthorized' });
  }
  const state = router.db.getState();
  const users = state.users;
  const found = users.find(user => user.email === req.body.email && user.password === req.body.password);
  if (!found) {
    return res.status(401).json({ auth: false, result: 'Unauthorized' });
  } else {
    const token = '123456qwerty';
    res.status(200).json({ auth: true, result: 'Authorized', token });
    router.db.setState({ ...state, sessions: [...state.sessions, { userId: found.id, token }] });
  }
});

server.use('/api', (req, res, next) => {  // auth middleware, any /api requests below this line require authorization
  const token = req.headers.authorization;  // nodejs lowecases the headers
  const sessions = router.db.getState().sessions;

  if (!token || !sessions.find(s => s.token === token)) {
    return res.status(401).json({ auth: false, result: 'Unauthorized' });
  }

  next();
})

server.get('/api/logout', (req, res) => {
  const token = req.headers.authorization;  // nodejs lowecases the headers
  const state = router.db.getState();
  const sessions = state.sessions;
  router.db.set('sessions', sessions.filter(s => s.token !== token)).write();  // or setState() with the whole new state
  res.status(200).json({ success: true });
});

server.get('/api/user', (req, res) => {
  const token = req.header('Authorization');  // or req.headers.authorization, node lowecases the headers

  const state = router.db.getState();
  const sessions = state.sessions;
  const users = state.users;

  const session = sessions.find(s => s.token === token);
  console.log('id', session.userId);
  if (session) {
    const user = users.find(u => u.id === session.userId);
    console.log('user', user);
    if (user) {
      return res.status(200).json({ user });
    }
  }
  return res.status(401).json({ auth: false, result: 'Unauthorized' });
});

server.get('/api/courses', (req, res) => {
  const courses = router.db.getState().courses;
  return res.status(200).json({ courses });
});

server.get('/api/users', (req, res) => res.status(403).json({ result: 'Forbidden' }));     // users and sessions are only used internally
server.get('/api/sessions', (req, res) => res.status(403).json({ result: 'Forbidden' }));  // direct get access forbidden, even for authorized users

server.use('/api', router);

server.get('*', (req, res) => { // SPA default route
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(3000, () => {
  console.log('listening on *:3000');
})
