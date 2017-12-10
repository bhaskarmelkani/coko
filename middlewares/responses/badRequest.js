'use strict';


module.exports = (ctx) => {

  return (error) => {

    // Check if safe tosend respnose back, send in dev env not in prod
    if (true){  // eslint-disable-line no-constant-condition
      if (true){   // eslint-disable-line no-constant-condition
        // LOg errors
        // console.error(error);
      }
      ctx.body = error;
    }
    ctx.status = 400;
  };
};
