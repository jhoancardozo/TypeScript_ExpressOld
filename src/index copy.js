const express = require('express');
// var http = require("http");
// var url = require("url");
// var querystring = require("querystring");
// var consts = require("./utils/consts");
// var firebase = require("../libs/firebase");
const { info, error } = require('./modules/my-log');
const { countries, languages } = require('countries-list');

const app = express();

// var server = http.createServer(function(request, response) {
//   var parsed = url.parse(request.url);
//   console.log("parsed:", parsed);

//   var pathname = parsed.pathname;

//   var query = querystring.parse(parsed.query);
//   console.log("query", query);

//   if (pathname === "/") {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write("<html><body><p>HOME PAGE</p></body></html>");
//     response.end();
//   } else if (pathname === "/exit") {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write("<html><body><p>BYE</p></body></html>");
//     response.end();
//   } else if (pathname === "/country") {
//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.write(JSON.stringify(countries[query.code]));
//     response.end();
//   } else if (pathname === "/info") {
//     var result = info(pathname);
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(result);
//     response.end();
//   } else if (pathname === "/error") {
//     var result = error(pathname);
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(result);
//     response.end();
//   } else {
//     response.writeHead(404, { "Content-Type": "text/html" });
//     response.write("<html><body><p>NOT FOUND</p></body></html>");
//     response.end();
//   }
// });

// ROTUTE WITH PARAM
// 1. param get option 1 (/country?code=EC) -> used query

app.get('/country', (request, response) => {
  console.log('request.query : ', request.query);
  response.json(countries[request.query.code]);
});

// 2. param get option 2 (/languages/:NOMBREPARAMETRO) -> used params

app.get('/languages/:lang', (request, response) => {
  console.log('request.param', request.params);
  const lang = languages[request.params.lang];
  if (lang) {
    response.json({ status: 200, data: languages[request.params.lang] });
  } else {
    response.json({
      status: 'NOT_FOUND',
      message: `language ${request.params.lang} not found`
    });
  }
});

// server.listen(4000);
// console.log("running on 4000");
app.get('/', function(request, response) {
  response.status(200).send('Inicio');
});

app.get('/info', function(request, response) {
  info('Entramos a info');
  response.status(200).send('Infooo');
});

app.get('*', function(request, response) {
  response.status(404).send('unauthorized');
});

app.listen(4000, function() {
  console.log('running on 4000');
});
