"use strict";

var colors = require('chalk');
var timeStamp = require('./current-timestamp');

function showMsg(color, tag, msg, timestamp, time){

  var str = "";

  if(!time){
    time = new Date();
  }

  if(timestamp){
    str += timeStamp(time)+" : ";
  }
  // console.log("timestamp: "+timestamp);
  // console.log("str: "+str);

  if(!tag){
    tag = '';
  }else {
    tag=tag+" : ";
  }


  if(!color){
    color = "blue";
  }

  // console.log(str+tag+msg);
  console.log(colors[color](str+tag+msg));
}

module.exports = showMsg;
