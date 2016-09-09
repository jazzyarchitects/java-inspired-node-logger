"use strict";

var colors = require('colors');


var timeStamp = require('./current-timestamp');

var deliminators = [' '];

function min(a, b){
  return a<b?a:b;
}
// var deliminators = [' ',',',':','.','?','!','-'];


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
    if(deliminators.indexOf(msg[k])===-1){
      while(deliminators.indexOf(msg[k])===-1){
        k--;
      }
    }

    var firstLine = msg.substring(0, k);
    string += colors[color](" : "+firstLine);

    var start = k;
    var end = k + config.colCount - padding;
    var totalLength = msg.length;
    var shouldBreak = false;
    while(end <= totalLength && !shouldBreak){
      if(end === totalLength){
        shouldBreak = true;
      }
      var l = end;
      if(deliminators.indexOf(msg[l])===-1){
        while(deliminators.indexOf(msg[l])===-1 && msg[l]){
          l--;
        }
      }
      if(Math.abs(l-end)>15){
        l = end;
      }

      var t = "\n"+spaceString+msg.substring(start, l).trim();

      if(msg.substring(start, l).length <= 0){
        break;
      }

      var arr = msg.substring(start, l).split('\n');

      //Handle new line characters
      if(arr.length > 1){
        t="\n"+spaceString+arr[0].trim();
        end = l + config.colCount - padding - (msg.substring(start, l).length - arr[0].length - 1);
        start = start+arr[0].length+1;
      }else{
        var t1 = start;
        start = start + config.colCount - padding - Math.abs(l-end);
        end = l + config.colCount - padding;
      // console.log(colors.red("Start: "+start+" l: "+l+" end: "+end+" totalLength: "+totalLength));
      totalLength += padding;
      if(end > totalLength){
        t = "\n"+spaceString+msg.substring(t1, l).trim();
        end = totalLength;
      }
    }

    string += colors[color](t);
  }

}else{
  string+=colors[color](" : "+msg);
}
console.log(string);
}

module.exports = showMsg;
