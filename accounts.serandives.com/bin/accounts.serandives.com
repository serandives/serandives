#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander')
  , app = require('..')

// options

program
  .option('-p, --port <n>', 'set port number [3000]', parseInt)
  .parse(process.argv);

// title

process.title = 'accounts.serandives.com';

// listen

var port = program.port || 4000;
app.listen(port);
console.log('accounts.serandives.com listening on port %d', port);
