'use strict';


module.exports = () => {

  return async function responses (ctx, next) {

    const badRequest = require('./badRequest')(ctx);
    const created = require('./created')(ctx);
    const forbidden = require('./forbidden')(ctx);
    const notFound = require('./notFound')(ctx);
    const ok = require('./ok')(ctx);
    const serverError = require('./serverError')(ctx);

    const responseTypes = {
      badRequest,
      created,
      forbidden,
      notFound,
      ok,
      serverError
    };


    Object
      .keys(responseTypes)
      .forEach((key) => {
        ctx[key] = responseTypes[key];
      });

    await next();

  };
};


// Check accepted  data types and response accordingly type
