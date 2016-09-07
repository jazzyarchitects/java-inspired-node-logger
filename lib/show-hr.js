"use strict";

var colors = require('colors');
var timeStamp = require('./current-timestamp');

function showMsg(color, tag, msg, timestamp, time){

  var str = "";

  if(timestamp){
    str += timeStamp(time)+" ";
  }

  if(!tag){
    tag = '';
  }

  console.log(colors[color](str+tag+msg))
}

module.exports = showMsg;
