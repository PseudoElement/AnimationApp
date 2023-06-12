const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(
    jsonServer.rewriter({
        './server/*': '/$1',
    })
);
server.use(router);
server.listen(3000, () => console.log('SERVER LISTENING ON 3000 PORT...'));
module.exports = server;
