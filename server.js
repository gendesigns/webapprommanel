var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(
    serveStatic("../angularjs")
).listen(5000);