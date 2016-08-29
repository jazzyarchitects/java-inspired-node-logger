"use strict";

var fs  = require('fs');
var path = require('path');


var config = {
  projectRoot : '',
  projectName  : ''
}

module.exports = function(){
  var filename = path.join('..', 'package.json');
  while(true){
    if(fs.existsSync(filename)){
      var filename2 = filename;
      config.projectName = require(filename2).name;
      config.projectRoot = require.resolve(filename).replace('package.json', '');
      break;
    }
    filename = path.join('..',filename);
  }
  return require('./lib/show-msg')(config);
}();
