"use strict";

var colors = require('colors');


var timeStamp = require('./current-timestamp');


function showMsg(color, tag, msg, config , callerFile, time){

  var Log = require('./log');
  if(!time){
    time = new Date();
  }
  if(callerFile){
    var path = callerFile.replace(config.projectRoot, '');
  }

  if(!msg){
    msg = tag;
    tag = config.defaultTag;
  }

  if(!tag){
    tag = config.projectName || '';
  }

  var string = "";

  string += colors[color](timeStamp(time)+" ");

  if(config.projectName && config.showProjectName){
    string+=colors[color](config.projectName+" | ");
  }

  string+=colors[color](path+" : ");

  if(config.tagBold){
    string+=colors[color].bold(tag);
  }else{
    string += colors[color](tag);
  }

  string+=colors[color](" : "+msg);

  console.log(string);
}

module.exports = showMsg;
