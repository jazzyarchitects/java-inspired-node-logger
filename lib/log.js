"use strict";

var showMsg = require('./show-msg');
var pathFinder = require('./root-dir');

function Log(config){
  this.__config = {};
  this.init();
}

Log.prototype.init = function(config) {
  var pathFinderResult=undefined;
  // console.log("Init log: "+JSON.stringify(Log.globalConfig)+" \n"+JSON.stringify(config));
  if(!Log.globalConfig){
    Log.globalConfig = {};
  }

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
    this.__config.projectName = pathFinderResult.projectName;
  }

  if(!this.__config.projectRoot){
    this.__config.projectRoot = pathFinderResult.projectRoot;
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

Log.globalConfig = {};

//Constants
Log.prototype.DEFAULT_TAG = "defaultTag";
Log.prototype.PROJECT_NAME = "projectName";

module.exports = Log;
