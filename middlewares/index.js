'use strict';

const compose = require('koa-compose');
const path = require('path');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const etag = require('koa-etag');
const responses = require('./responses');
const includeAll = require('include-all');
const promisify = require('es6-promisify');
const conditional = require('koa-conditional-get');

const optionalPromise = promisify(includeAll.optional);

module.exports = async (app, options) => {

  const defaultMiddlewares = [
    responses(),
    logger(),
    bodyParser(),
    morgan('combined')
  ];

  if (options.etag){
    defaultMiddlewares.push(conditional());
    defaultMiddlewares.push(etag());
  }

  const userMiddlewares = await optionalPromise({
    dirname: path.resolve(process.cwd(), 'app/middlewares'),
    filter: /(.+)\.js$/
  });

  const middlewaresArray = Object
    .keys(userMiddlewares)
    .reduce((acc, curr) => {
      const middleware = userMiddlewares[curr];
      if (Array.isArray(middleware)){
        return [...acc, ...middleware];
      } else {
        return [...acc, middleware];
      }
    }, defaultMiddlewares);

  const composedMiddleware =  compose(middlewaresArray);

  app.use(composedMiddleware);
};
