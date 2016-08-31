"use strict";

var colors = require('colors');


var timeStamp = require('./current-timestamp');


function showMsg(color, tag, msg, config){

  var Log = require('./log');

  var time = new Date();
  var path = __filename.replace(config.projectRoot || Log.globalConfig.projectRoot, '');

  if(!msg){
    msg = tag;
    tag = config.defaultTag || Log.globalConfig.defaultTag;
  }

  if(!tag){
    tag = config.projectName || '';
  }

  console.log(colors[color](timeStamp(time)+" "+path+" : ")+colors[color].bold(tag)+colors[color](" : "+msg));
}

module.exports = showMsg;
