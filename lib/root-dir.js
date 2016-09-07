"use strict";

var path = require('path');
var fs = require('fs');


function pathFinder(){
  // console.log("Path finding");
  var _config = {};
  var filename = path.join('..', 'package.json');
  var counter = 20;
  while(true & counter-->0){
    // console.log("File exists: "+filename+" "+fs.existsSync(filename));
    if(fs.existsSync(filename)){

      var con = fs.readFileSync(filename).toString();
      // console.log("Content: "+con);

      // var filename2 = filename;
      // console.log("Found path: "+path.join(__dirname, filename2));
      _config.projectName = JSON.parse(con).name;
      _config.projectRoot = path.resolve(__dirname, '..', '..', filename).replace('package.json', '');
      // console.log("Found _config: "+JSON.stringify(_config));
      if(!(_config.projectName === 'java-style-debugger'))
        break;
    }
    filename = path.join('..',filename);
  }
  return _config;
}

module.exports = pathFinder;


