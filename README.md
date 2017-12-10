# coko
[![license](https://img.shields.io/npm/l/coko.svg)](https://github.com/bhaskarmelkani/coko/blob/master/LICENSE)
[![dependencies Status](https://david-dm.org/bhaskarmelkani/coko/status.svg)](https://david-dm.org/bhaskarmelkani/coko)
[![npm](https://img.shields.io/npm/v/coko.svg)](https://www.npmjs.com/package/coko)
[![npm](https://img.shields.io/npm/dw/coko.svg)](https://www.npmjs.com/package/coko)


coko is a minimal framework built ontop of [Koa](https://github.com/koajs/koa).

coko provides a conventional approach for building apps using [async/await](https://github.com/koajs/koa#async-functions-node-v76) pattern of [Koa2](https://github.com/koajs/koa).
It gives a basic boiler plate for Koa ontop of which you can write your application logic.

coko is inpsired from [Sailsjs](https://sailsjs.com/) and keeping the setup minimal and extensible.

> Note: Check [coko-bean](https://github.com/bhaskarmelkani/coko-bean) for the example.


coko's feature includes:-
* [Convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration).
* Routing using [koa-router](https://github.com/alexmingoia/koa-router).
* Body parsing.
* Logging using [koa-logger](https://github.com/koajs/logger) and [koa-morgan](https://github.com/koa-modules/morgan).
* Response handling, by providing response handlers like [sails responses](https://sailsjs.com/documentation/reference/response-res)(eg. `res.ok()`, etc...).
* Conditional get support using [conditional-get](https://github.com/koajs/conditional-get).

## Table of contents

* [Getting Started](#get-started)
* [Documentation](./docs/README.md)
* [Roadmap](#roadmap)
* [Development & Contributing](#developement-and-contributing)
* [License](#license)


## <a name="get-started"></a> Get Started

Since coko is a [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) framework, it uses a minimal directory structure.
[coko-bean](https://github.com/bhaskarmelkani/coko-bean) is there to help you getting started with the structure that is best suited with coko.

* Clone the seed project [coko-bean](https://github.com/bhaskarmelkani/coko-bean).

` git clone https://github.com/bhaskarmelkani/coko-bean.git`
* Go into the directory

`cd coko-bean  && npm install`

* Start the server

`npm start`

This command will run a http sever on port `4000`, you can configure the port(TODO).

> The seed has a test route ***/user***

Open [`http://127.0.0.1:4000/user`](http://127.0.0.1:4000/user).

Whoaaa, this was quick !!!

## <a name="roadmap"></a> Roadmap

coko is still developing and is ambitious to get features that should be provided by a minimal framework.

* Add testing support.(Maybe using [Jest](https://github.com/facebook/jest))
* If needed, add support for Expect: 100-continue.
* Create a config module and provide it in controllers, services and maybe middlewares.
* For now ejs(using [koa-views](https://github.com/queckezz/koa-views)) is a default templating engine, add support for configuring it.
* Add support for static file serving.
* Add configurable security headers for response.
* Add better error handling.
* Add support for customizing/adding responses(eg. `res.ok()`, etc...).
* Add tracing using [koa-trace](https://github.com/koajs/trace).
* Add configurable jsonp support. Check [koa-safe-jsonp](https://github.com/koajs/koa-safe-jsonp)
* If required add authentication strategies.
* Add support for database handling.
* Add cli for generating seed.

## <a name="developement-&-contributing"></a> Developement and Contributing

Check detailed [contributing guidelines](./CONTRIBUTING.md).

## <a name="license"></a> License

The MIT License (MIT). See [full license](./LICENSE).


