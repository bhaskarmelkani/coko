'use strict';

const views = require('koa-views');
const qs = require('koa-qs');
const jsonp = require('koa-safe-jsonp');
const {merge} = require('lodash');

const app = require('./lib/app');
const router = require('./lib/router');
const middlewares = require('./middlewares');
const config = require('./config');


const port = process.env.PORT || config.port;

module.exports = (options) => async () => {


  options = merge(options, config.options, {});


  const viewsPath = options.views.path;
  app.use(views(viewsPath, {
    extension: options.views.extension
  }));


  await middlewares(app, options);

  if (options.qs){
    qs(app);
  }

  if (options.jsonp) {
    jsonp(app, options.jsonp);
  }

  await router(app);

  await app.listen(port);
};
