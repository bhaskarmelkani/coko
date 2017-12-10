'use strict';

const path = require('path');
const includeAll = require('include-all');
const promisify = require('es6-promisify');
const compose = require('koa-compose');
const optionalPromise = promisify(includeAll.optional);
const Router = require('koa-router');
const Boom = require('boom');

const configManager = require('./config.js');

const cwd = process.cwd();
const allowedMethods = {
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
};


module.exports = async (app) => {
  const controllers = await optionalPromise({
    dirname: path.resolve(cwd, 'app/controllers'),
    filter: /(.+)\.js$/
  });


  const routes = await optionalPromise({
    dirname: path.resolve(cwd, 'app/routes'),
    filter: /(.+)\.js$/
  });

  const services = await optionalPromise({
    dirname: path.resolve(cwd, 'app/services'),
    filter: /(.+)\.js$/
  }) || {};

  const config = await configManager();


  //Inject config in services if required
  Object
    .keys(services)
    .forEach((key) => {
      if('function' == typeof services[key]){
        services[key] = services[key]({ config })
      }
    })

  const dependency = services || {};
  dependency.config = config;

  const composed = Object
    .keys(routes)
    .reduce((acc, name) => {
      const routerConfig = {};
      const router = new Router(routerConfig);
      const group = routes[name];

      Object
        .keys(group)
        .forEach((key) => {
          const routeObject = group[key];
          // TODO: Make this key parsing module and testable
          const keyParts = key.split(' ');
          const verb = keyParts[0];
          const path = keyParts[1];

          // TODO: Check verb n path should be defined
          // TODO: Check if we can use regexp
          if (['get', 'post', 'put', 'patch', 'options'].includes(verb)){
            // TODO: Check how you can add middle wares here for a route.
            // mayber provide in routes file

            const actionName = routeObject.action;

            const controllerGenerator = controllers[name];

            let action;
            if ('function' === typeof controllerGenerator){
              const controller = controllerGenerator(dependency);
              action = controller[actionName];
            } else {
              action = controllerGenerator[actionName];
            }

            router[verb](path, action);

          }
        });

      return [
        router.routes(),
        router.allowedMethods(allowedMethods),
        ...acc
      ];

    }, []);

  const generatedRoutes = compose(composed);

  app.use(generatedRoutes);
};
