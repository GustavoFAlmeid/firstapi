const http = require('http');
const { URL } = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);
    console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

    let { pathname } = parsedUrl;
    const splitEndpoint = pathname.split('/').filter(Boolean);
    // const splitEndpoint = pathname.split('/').filter((routeItem) => Boolean(routeItem));
    const route = routes.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method === request.method
    ));

    if (route) {
        request.query = Object.fromEntries(parsedUrl.searchParams);
        route.handler(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(`Cannot ${request.method} ${request.url}`);
    }
    // if (request.url === '/users' && request.method === 'GET') {
    //     UserController.listUsers(request, response);
    // } else {

    // }

});

server.listen(3000, () => console.log('Server On-line'));