## Table of contents
* [Usage](#usage)
* [Options](#Options)
  * [Views](#views)
  * [qs](#qs)
  * [jsonp](#jsonp)
  * [etag](#etag)
* [App Structure](#app-structure)
  * [Controllers](#controllers)
  * [Middlewares](#middlewares)
  * [Services](#services)
  * [Routes](#routes)
  * [Views](#views)
* [Config](#config)
  * [config/local.js](#local-config)

## <a name="usage"></a> Usage

>  You can refer an example implementation([coko-bean](https://github.com/bhaskarmelkani/coko-bean)) to see how it works in detail.

Following is an example directory structure, that should be used with coko.
```
.
+-- index.js
+-- app
|   +-- controllers
|   |   +- user.js
|   +-- middlewares
|   |   +- foo.js
|   +-- routes
|   |   +- user.js
|   +-- services
|   |   +- db.js
|   +-- views
|       +- user.ejs
+-- config
|   +-- local.js
|   +-- *.js
+-- package.json
|
```

These directories are required to use coko to its full extent however if any directory is missing coko will silently ignore it.

>  **Eg.**  If you dont need services, so you dont have to create a service directory.

Check app structure for details.

To instantiate coko, you should require the module and call it with passing options.

>  More on options later.

```js
// index.js

const options = {etag: true};
const app = require('coko')(options);
app();
```

## <a name="options"></a> Options

While instantiating coko you can provide following options.

### <a name="views"></a> Views

Provide options to configure view engine([koa-views](https://github.com/queckezz/koa-views)).

* path: Path of views folder. Default `app/views`.
* extension: Default extension for your views. Default `ejs`.

```js
options = {
  views:{
    path: 'app/views',
    extension: 'ejs'
  }
}
```

### <a name="qs"></a> qs

Provide config for activating [koa-qs](https://github.com/koajs/qs).

```js
options = {
  qs: true
}
```

### <a name="jsonp"></a> jsonp

Configure safe jsonp support using [koa-safe-jsonp](https://github.com/koajs/koa-safe-jsonp).

```js
options = {
  jsonp: {
    //... options from koa-safe-jsonp
  }
}
```

### <a name="etag"></a> etag

Activate etag (using [koa-etag](https://github.com/koajs/etag)) and conditional get (using [koa-conditional-get](https://github.com/koajs/conditional-get)) support.

```js
options = {
  etag: true
}
```

## <a name="app-structure"></a> App Structure

For an example of an entire coko app, check [coko-bean](https://github.com/bhaskarmelkani/coko-bean).

coko takes a [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) approach to structure the code, so naming files and folders is important to take the full benifit of the framework.

All the folders described below are not mandatory(the code will not break).

### <a name="controllers"></a> app/controllers

This is a directory that holds your controllers.

Controllers are javascript files that contain logic that should be invoked when a route is called.

A file in `controllers` folder represents a controller with the name same as the name of the file.

Controllers can have multiple functions that take `ctx` ([coa context](https://github.com/koajs/koa/blob/master/docs/api/context.md)) as an argument.

Controllers can export its methods in two following ways.

* Export a map of methods.
* If you want to inject a [service](#services), [config](#config) in the controller, export a function having argument with a name of the service ([destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)).

> Check example controller [coko-bean/app/controllers/user.js](https://github.com/bhaskarmelkani/coko-bean/blob/master/app/controllers/user.js).

### <a name="middlewares"></a> app/middlewares

This directory holds all the koa [middleware](https://github.com/koajs/koa#middleware).

> Check example middleware [coko-bean/app/middlewares/foo.js](https://github.com/bhaskarmelkani/coko-bean/blob/master/app/middlewares/foo.js).

### <a name="services"></a> app/services

This directory contains your services.

Services are similar to controllers but they are used for things that do not rely on koa [`request`](https://github.com/koajs/koa/blob/master/docs/api/request.md#request) or [`response`](https://github.com/koajs/koa/blob/master/docs/api/response.md#response).

The purpose of having a service is to seperate modules/code snippets (that can be reused) from controllers to keep them clean and manageable.

You can use services for

* Sending emails
* Retriving data from third party APIs
* Creating adaptors for connetcing with things like database, queues, websockets.

Services are created with the same name as the name of the file in services folder.

If you want to access any service in a controller, make the exports in controller as a function instead of map and pass the name of the service as distructiong argument.

**Eg.**

*If you have a serivce file with name `db.js`. A service with name `db` will be created.*

*You can access the service in a controller(eg. `user.js`) in the following way.*

```js
// app/controllers/user.js

module.exports = ({ db, config }) => ({
	  async getUser (ctx){
	    const userName  = db.getUserName();
	    ctx.body = userName;
	  }
});
```
```js
// app/services/db.js

module.exports = ({config}) => ({

  getUserName (host){
    const dbConfig = config.db;
    const dbHost = host || dbConfig.host;
    return 'James Bond is hosting at ' + dbHost;
  }

});
```

* If you want to inject [config](#config) in the service, export a function having config as an argument using ([destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)).

>  Check example service [coko-bean/app/services/db.js](https://github.com/bhaskarmelkani/coko-bean/blob/master/app/services/db.js).

### <a name="routes"></a> app/routes

This directory contains your routes.

Routes are files that contains the mapping between the route path and the method in the controller.

The name of the route file should be same as the name of the controller it should connect to.

**Eg.**

*To create a `/get` route for user controller(`getUser` method).*

```js
// app/routes/user.js

module.exports = {
 'get /user': {
    action: 'getUser'
  }
};
```

> Check example route [coko-bean/app/routes/user.js](https://github.com/bhaskarmelkani/coko-bean/blob/master/app/routes/user.js).


### <a name="views"></a> app/views

This folder contains all the views.

You can place all your view files in this folder and call them with the name of view file.



**Eg.**

*To render a view with file name `user.ejs` in any controller.*

*You can do `ctx.render('user');`.*

>Check example view [coko-bean/app/views/user.ejs](https://github.com/bhaskarmelkani/coko-bean/blob/master/app/views/user.ejs) being rendered in a controller [coko-bean/app/controllers/user.js](https://github.com/bhaskarmelkani/coko-bean/blob/master/app/controllers/user.js#L12).

## <a name="config"></a> Config

coko adhers to the philosophy of [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration), still you can provide options for situtation where you want to provide configurations for services, thirdy party modules, etc.

You should provide configs files in the `config` folder with the name by which you may want to use it later.

> Eg. `config/db.js` will create a property `db` in `config` object that is injected to controllers and services and you can use it using `config.db`.

### <a name="local-config"></a> config/local.js
`local.js` is a config file that is for your local system and it overwrites other configs.
It should be git ignored. (Check [coko-bean](https://github.com/bhaskarmelkani/coko-bean/blob/master/.gitignore#L4) example)

Usage:
```
.
|
+-- config
|   +-- local.js
|   +-- db.js
|
```
```js
// config/db.js
module.exports = {
  'host': 'db.example.com',
  'port': 1347
};
```
```js
// config/local.js
module.exports = {
  db:{
    'host': '127.0.0.1'
  }
};
```

`config` object is injected to controllers and services, all the properties can be accessed using the same.
Eg. `config.db` will give object provided in above example.


---
>**If you didn't find what you are looking for. Please [raise an issue](https://github.com/bhaskarmelkani/coko/issues/new), we will get back to you ASAP.**
