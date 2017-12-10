'use strict';

module.exports = (ctx) => {

  return (body) => {
    ctx.body = body;
    ctx.status = 201;
  };
};
