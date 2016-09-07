"use strict";

var colors = require('colors');
var timeStamp = require('./current-timestamp');

function showMsg(color, tag, msg, timestamp, time){

  var str = "";

  var string = "";

  if(timestamp){
    str += timeStamp(time)+" ";
  }
  string += str;

  if(!tag){
    tag = '';
  }

  if(!color){
    color = "blue";
  }

  console.log(colors[color](str+tag+msg));
}

module.exports = showMsg;
