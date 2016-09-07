"use strict";


var Log = require('./lib/log');

//exporting singleton class
exports = module.exports = new Log();

exports.Logger = Log;
