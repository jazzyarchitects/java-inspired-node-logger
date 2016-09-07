"use strict";

var colors = require('colors');


var timeStamp = require('./current-timestamp');


function showMsg(color, tag, msg, config , callerFile, time){

  var Log = require('./log');
  if(!time){
    time = new Date();
  }
  var path = callerFile.replace(config.projectRoot || Log.globalConfig.projectRoot, '');

  if(!msg){
    msg = tag;
    tag = config.defaultTag || Log.globalConfig.defaultTag;
  }

  if(!tag){
    tag = config.projectName || '';
  }

  var string = "";

  // console.log("Config: "+JSON.stringify(config));
  string += colors[color](timeStamp(time)+" "+path+" : ");
  if(config.tagBold){
    string+=colors[color].bold(tag);
  }else{
    string += colors[color](tag);
  }

  string+=colors[color](" : "+msg);


  // console.log(colors[color](+" "+path+" : ")+colors[color].bold(tag)+colors[color](" : "+msg));
  // console.log(colors[color](string));
  console.log(string);
}

module.exports = showMsg;
