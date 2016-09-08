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

  var count = 0;

  string += colors[color](timeStamp(time)+" ");
  count += (timeStamp(time)+" ").length;

  if(config.projectName && config.showProjectName){
    string+=colors[color](config.projectName+" | ");
      count += (config.projectName+" | ").length;
  }


  string += colors[color](path+" : ");

  count += (path+" : ").length;


  if(config.tagBold){
    string+=colors[color].bold(tag);
  }else{
    string += colors[color](tag);
  }

  count += tag.length;



  var msgString = "";
  var residueLength = count+3;
  var length = msg.length;
  var padding = 15;

  console.log("residueLength: "+residueLength);
  if(msg.length > config.colCount){
    string+=colors[color](" : "+msg.substring(0, (config.colCount-residueLength-1)));
  }

  var k = config.colCount - residueLength - 1;

  while(k < length){
    var s = "";
    for(var i = 0;i<padding;i++){
      s+=" ";
    }
    string += colors[color]("\n" +s+msg.substring(k, k+ config.colCount - padding -1 ));
    // console.log("String: "+string+"\nk: "+k+"\nlength: "+length+"\nfactor: "+(config.colCount - k - padding -1));
    k = k +(config.colCount - padding -1);
  }


  // string+=colors[color](" : "+msg);


  console.log(string);
}

module.exports = showMsg;
