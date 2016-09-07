"use strict";

var showMsg = require('./show-msg');
var showHr = require('./show-hr');
var pathFinder = require('./root-dir');

function Log(config){
  this.__config = {};
  this.init(config);
}

Log.prototype.init = function(config) {
  var pathFinderResult=undefined;
  // console.log("Init log: "+JSON.stringify(Log.globalConfig)+" \n"+JSON.stringify(config));
  if(!Log.globalConfig){
    Log.globalConfig = {};
  }

  Log.globalConfig.col_count = process.stdout.columns;
  Log.globalConfig.row_count = process.stdout.rows;

  if(!Log.globalConfig.projectName){
    pathFinderResult = pathFinder();
    Log.globalConfig.projectName = pathFinderResult.projectName;
  }

  if(!Log.globalConfig.projectRoot){
    if(!pathFinderResult){
      pathFinderResult = pathFinder();
    }
    Log.globalConfig.projectRoot = pathFinderResult.projectRoot;
  }

  if(config){
    this.__config = config;
  }else{
    this.__config = Log.globalConfig;
  }

  if(!this.__config.projectName){
    if(!pathFinderResult){
      pathFinderResult = pathFinder();
    }
    this.__config.projectName = pathFinderResult.projectName;
  }

  if(!this.__config.projectRoot){
    if(!pathFinderResult){
      pathFinderResult = pathFinder();
    }
    this.__config.projectRoot = pathFinderResult.projectRoot;
  }

  if(this.__config.adaptScreenSize !== false){
    process.stdout.on('resize', function(){
      if(!Log.USER_DEFINED_LENGTH){
        Log.globalConfig.col_count = process.stdout.columns;
        Log.globalConfig.row_count = process.stdout.rows;
      }
    });
  }

};

Log.prototype.error = Log.prototype.e = function(tag, msg){
  showMsg("red", tag, msg, this.__config);
}

Log.prototype.warn = Log.prototype.w = function(tag, msg){
  showMsg("yellow", tag, msg, this.__config);
}

Log.prototype.info = Log.prototype.i = function(tag, msg){
  showMsg("green", tag, msg, this.__config);
}

Log.prototype.debug = Log.prototype.d = function(color, tag, msg){
 if(arguments.length < 3){
  color = null;
  tag = arguments[0];
  msg = arguments[1];
}
if(!color){
  color = "white";
}
showMsg(color, tag, msg, this.__config);
}

Log.prototype.config = function(config){
  this.__config = config;
}

Log.prototype.setGlobalConfig = function(config){
  Log.globalConfig = config;
}

Log.prototype.addGlobalConfig = function(key, value){
  Log.globalConfig[key] = value;
}


Log.prototype.hr = function(length, tag, timestamp, color){
    length = length || Log.globalConfig.col_count;
  if(!Log.globalConfig.show_hr_timestamp){
    color = timestamp;
  }
  var str = "";
  for (var i = 0; i < length; i++) {
    str+=Log.globalConfig.hr_element || '-';
  }
  showHr(color || Log.globalConfig.hr_color, tag || '', str, timestamp)

}

Log.globalConfig = {
  hr_element: '-',
  hr_color: 'blue',
  show_hr_timestamp: false
};

//Constants
Log.prototype.DEFAULT_TAG = "defaultTag";
Log.prototype.PROJECT_NAME = "projectName";
Log.prototype.HORIZONTAL_ELEMENT = "hr_element";
Log.prototype.HORIZONTAL_LENGTH = "col_count";
Log.prototype.USER_DEFINED_LENGTH = "userdefinedlength";


module.exports = Log;
