'use strict';

const path = require('path');
const includeAll = require('include-all');
const promisify = require('es6-promisify');
const compose = require('koa-compose');
const optionalPromise = promisify(includeAll.optional);
const { merge } = require('lodash');

const cwd = process.cwd();


//TODO: Add envrioment specific configs

module.exports = async (app) => {

  const userConfig = await optionalPromise({
    dirname: path.resolve(cwd, 'config'),
    filter: /^(.+)\.js$/
  }) || {};


  const localConfig = userConfig.local || {};
  delete userConfig.local;

  const config = merge(userConfig, localConfig, {});



  return config;

};
