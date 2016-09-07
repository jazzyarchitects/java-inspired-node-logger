"use strict";

var showMsg = require('./show-msg');
var showHr = require('./show-hr');
var pathFinder = require('./root-dir');

function _getCallerFile() {
    try {
        var err = new Error();
        var callerfile;
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = err.stack.shift().getFileName();
        // console.log("CurrentFile: "+currentfile);

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();
            // console.log("Callerfile in while: "+callerfile);

            if(currentfile !== callerfile) return callerfile;
        }
    } catch (err) {}
    return undefined;
}

function Log(config){
  this.__config = {};
  this.init(config);
}

Log.globalConfig = {
  hrChar: '-',
  hrColor: "blue",
  showHrTimestamp: false
};

Log.prototype.init = function(config) {
  var pathFinderResult=undefined;
  // console.log("Init log: "+JSON.stringify(Log.globalConfig)+" \n"+JSON.stringify(config));
  if(!Log.globalConfig){
    Log.globalConfig = {};
  }

  Log.globalConfig.colCount = process.stdout.columns;
  Log.globalConfig.rowCount = process.stdout.rows;

  if(!Log.globalConfig.projectName){
    pathFinderResult = pathFinder();
    Log.globalConfig.projectName = pathFinderResult.projectName;
  }

  if(!Log.globalConfig.projectRoot){
    if(!pathFinderResult){
      pathFinderResult = pathFinder();
    }
    Log.globalConfig.projectRoot = pathFinderResult.projectRoot;
    // console.log("projectRoot: "+Log.globalConfig.projectRoot);
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
        Log.globalConfig.colCount = process.stdout.columns;
        Log.globalConfig.rowCount = process.stdout.rows;
      }
    });
  }

};

Log.prototype.sM = function(color, tag, msg){
  var time = new Date();
  var callerFile = _getCallerFile();
  showMsg(color, tag, msg, this.__config, callerFile, time);
}

Log.prototype.error = Log.prototype.e = function(tag, msg){
  this.sM("red", tag, msg);
}

Log.prototype.warn = Log.prototype.w = function(tag, msg){
  this.sM("yellow", tag, msg);
}

Log.prototype.info = Log.prototype.i = function(tag, msg){
  this.sM("green", tag, msg);
}

Log.prototype.debug = Log.prototype.d = function(color, tag, msg){
  var callerFile = _getCallerFile();
 if(arguments.length < 3){
  color = null;
  tag = arguments[0];
  msg = arguments[1];
}
if(!color){
  color = "white";
}
this.sM(color, tag, msg);
}

Log.prototype.config = function(config){
  this.__config = config;
}

Log.prototype.addConfig = function(key, value){
  if(arguments.length >1){
    this.__config[key] = value;
  }else{
    for(var k of Objects.keys(key)){
      this.__config[k] = key[k];
    };
  }
}

Log.prototype.setGlobalConfig = function(config){
  Log.globalConfig = config;
}

Log.prototype.addGlobalConfig = function(key, value){
  if(arguments.length >1){
    Log.globalConfig[key] = value;
  }else{
    for(var k of Objects.keys(key)){
      Log.globalConfig[k] = key[k];
    };
  }
}


Log.prototype.hr = function(length, tag, timestamp, color){
    length = length || Log.globalConfig.colCount;
  if(!Log.globalConfig.showHrTimestamp){
    color = timestamp;
  }
  var str = "";
  for (var i = 0; i < length; i++) {
    str+=Log.globalConfig.hrChar || '-';
  }
  showHr(color || Log.globalConfig.hrColor, tag || '', str, timestamp)

}


//Constants
Log.prototype.DEFAULT_TAG = "defaultTag";
Log.prototype.PROJECT_NAME = "projectName";
Log.prototype.HORIZONTAL_ELEMENT = "hrChar";
Log.prototype.HORIZONTAL_LENGTH = "colCount";
Log.prototype.USER_DEFINED_LENGTH = "userdefinedlength";
Log.prototype.BOLD_TAG = "tagBold"


module.exports = Log;
