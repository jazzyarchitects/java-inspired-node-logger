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

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();

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
  showHrTimestamp: false,
  showProjectName: true,
  adaptScreenSize: true
};

Log.prototype.init = function(config) {
  var pathFinderResult=undefined;
  if(!Log.globalConfig){
    Log.globalConfig = {};
  }

  Log.globalConfig.colCount = Log.globalConfig.hrLength = process.stdout.columns;
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
  }

  this.__config = Log.globalConfig;

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

  if(config){
    for(var k of Object.keys(config)){
      this.__config[k] = config[k];
    }
  }

  // if(){
    process.stdout.on('resize', function(){
      if(!Log.USER_DEFINED_LENGTH){
        Log.globalConfig.hrLength = process.stdout.columns;
      }
      Log.globalConfig.colCount = process.stdout.columns;
      Log.globalConfig.rowCount = process.stdout.rows;
      this.__config.colCount = Log.globalConfig.colCount;
      this.__config.rowCount = Log.globalConfig.rowCount;
    }.bind(this));
  // }

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
  this.__config = Log.globalConfig;
  for(var k of Object.keys(config)){
    this.__config[k] = config[k];
  }
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
  for(var k of Object.keys(config)){
    Log.globalConfig[k] = config[k];
  }
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


Log.prototype.hr = function(length, timestamp, color, tag, char){
  length = length || Log.globalConfig.hrLength;

  if(arguments.length !== 0){
    if(typeof(timestamp)!=="boolean"){
      color = timestamp;
    }
    if(timestamp !== true){
      if(this.__config.showHrTimestamp!==true){
        char = tag
        tag = color;
        color = timestamp;
        timestamp = undefined;
      }
    }
  }
  var str = "";
  var hrChar = this.__config.hrChar || '-';
  for (var i = 0; i < length/hrChar.length; i++) {
    str+=char || hrChar;
  }
  str=str.substring(0,length);
  showHr(color || this.__config.hrColor, tag, str, timestamp);

}

Log.prototype.section = function(color, msg, char){
  if(arguments.length === 1){
    msg = color;
    color = undefined;
  }
  if(arguments.length === 2){
    char = msg;
    msg = color;
    color = undefined;
  }
  color = color || this.__config.hrColor;
  char = char || this.__config.hrChar;
  var length = Log.globalConfig.hrLength;
  msg = msg.toUpperCase();
  var msgLength = msg.length;
  var f = "";
  var r = " ";
  for(var i = 0 ; i<(length-msgLength-2)/(2*char.length); i++){
    f += char;
    r+= char;
  }
  var str = f+" "+msg+r;
  str = str.substring(0, length);
  showHr(color, "", str, false);
}


//Constants
Log.prototype.DEFAULT_TAG = "defaultTag";
Log.prototype.PROJECT_NAME = "projectName";
Log.prototype.HORIZONTAL_ELEMENT = "hrChar";
Log.prototype.HORIZONTAL_LENGTH = "hrLength";
Log.prototype.USER_DEFINED_LENGTH = "userdefinedlength";
Log.prototype.BOLD_TAG = "tagBold"


module.exports = Log;
