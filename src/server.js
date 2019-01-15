var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: 8080,               // required, the port to listen
  cors: '*',                // optional, defaults to undefined
  templates: {
    index: 'index.html',      // optional, defaults to 'index.html'
    notFound: 'index.html'    // optional, defaults to undefined
  }
});

server.start(function () {
  console.log('Server listening to', server.port);
});
