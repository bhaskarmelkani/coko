'use strict';

module.exports = {
  port: 4000,
  options: {
    views: {
      path: process.cwd() + '/app/views',
      extension: 'ejs'
    }
  }
};
