"use strict";

var fs  = require('fs');
var path = require('path');
var Logger = require('./lib/logger');


var __config = {
  projectRoot : '',
  projectName  : ''
}

function getConfig(){
  var _config ={};
  var filename = path.join('..', 'package.json');
  var counter = 20;
  while(true & counter>0){
    if(fs.existsSync(filename)){
      var filename2 = filename;
      _config.projectName = require(filename2).name;
      _config.projectRoot = require.resolve(filename).replace('package.json', '');
      break;
    }
    filename = path.join('..',filename);
    counter--;
  }
  return _config;
}

function exportMain(){
  __config = getConfig();
  return require('./lib/show-msg');
}

exports = module.exports = exportMain();

// exports.Log = function(config){
//   if(config){
//     if(!config.projectName){
//       config.projectName = __config.projectName;
//     }
//     if(!config.projectRoot){
//       config.projectRoot = __config.projectRoot;
//     }
//     if(!config.projectName){
//       var c = getConfig();
//       config.projectName = c.projectName;
//       config.projectRoot = c.projectRoot;
//     }
//     return new Logger(config);
//   }else{
//     if(!__config.projectRoot){
//       __config = getConfig();
//     }
//   }
//   return new Logger(__config);
// }();


