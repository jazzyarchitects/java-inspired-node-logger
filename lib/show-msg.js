"use strict";

var colors = require('colors');


var timeStamp = require('./current-timestamp');

// var deliminators = [' '];
var deliminators = [' ',',',':','.','?','!','-'];


function showMsg(color, tag, msg, config , callerFile, time){

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

  // console.log("Msg: "+msg);

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


  var residueLength = count+3;
  var padding = 15;
  var first = true;
  var start = 0;

  var k = config.colCount - residueLength - 1;

  var spaceString = "";
  for(var i=0;i<padding;i++){
    spaceString += " ";
  }

  if(msg.length > config.colCount){;
    // var lines = Math.ceil(1 + (msg.length - config.colCount - residueLength)/(config.colCount - residueLength));


    //If kth character is not any deliminator
    // if(deliminators.indexOf(msg[k])===-1){
    //   while(deliminators.indexOf(msg[k])===-1){
    //     k--;
    //   }
    // }

    // var firstLine = msg.substring(0, k);
    // var fArr = firstLine.split('\n');
    // string += colors[color](" : "+firstLine);

    var start = 0;
    var end = config.colCount - residueLength -1;
    var totalLength = msg.length;
    var shouldBreak = false;
    var prefixString = " : ";
    while(end <= totalLength && !shouldBreak){
      if(end === totalLength){
        shouldBreak = true;
      }
      var l = end;
      // console.log("Substring: "+msg.substring(start, end));
      if(deliminators.indexOf(msg[l])===-1){
        while(deliminators.indexOf(msg[l])===-1 && msg[l]){
          l--;
        }
      }
      if(Math.abs(l-end)>15){
        l = end;
      }

      var t = prefixString+msg.substring(start, l).trim();

      if(msg.substring(start, l).length <= 0){
        break;
      }

      var arr = msg.substring(start, l).split('\n');

      //Handle new line characters
      if(arr.length > 1){
        t=prefixString+arr[0].trim();
        end = l + config.colCount - padding - (msg.substring(start, l).length - arr[0].length - 1);
        start = start+arr[0].length+1;
      }else{
        var t1 = start;
        start = start + config.colCount - residueLength - Math.abs(l-end);
        end = l + config.colCount - padding;
      // console.log(colors.red("Start: "+start+" l: "+l+" end: "+end+" totalLength: "+totalLength));
      totalLength += padding;
      if(end > totalLength){
        t = prefixString+msg.substring(t1, l).trim();
        end = totalLength;
      }
    }
    prefixString = "\n"+spaceString;
    residueLength = padding;
    string += colors[color](t);
  }

}else{
  string+=colors[color](" : "+msg);
}
console.log(string);
}

module.exports = showMsg;
