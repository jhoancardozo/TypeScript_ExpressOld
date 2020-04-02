// archivo de prueba para comprender el funcionamiento de ruotes en express
// ya no es necesario para la estructuracion del nuestro proyecto de express
// 
// Inicio codigo comentario
// 
// <--
// const { countries, languages } = require('countries-list');
// const routes = app => {
//   // ROTUTE WITH PARAM
//   // 1. param get option 1 (/country?code=EC) -> used query

//   app.get('/country', (request, response) => {
//     console.log('request.query : ', request.query);
//     response.json(countries[request.query.code]);
//   });

//   // 2. param get option 2 (/languages/:NOMBREPARAMETRO) -> used params

//   app.get('/languages/:lang', (request, response) => {
//     console.log('request.param', request.params);
//     const lang = languages[request.params.lang];
//     if (lang) {
//       response.json({ status: 200, data: languages[request.params.lang] });
//     } else {
//       response.json({
//         status: 'NOT_FOUND',
//         message: `language ${request.params.lang} not found`
//       });
//     }
//   });

//   // server.listen(4000);
//   // console.log("running on 4000");
//   app.get('/', function(request, response) {
//     response.status(200).send('Inicio');
//   });

//   app.get('/info', function(request, response) {
//     response.status(200).send('Infooo');
//   });

//   app.get('*', function(request, response) {
//     response.status(404).send('unauthorized');
//   });
// };
// module.exports = routes;
// 
// Fin codigo comentario
// 
// -->