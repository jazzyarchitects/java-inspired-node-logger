"use strict";

var colors = require('colors');


var timeStamp = require('./current-timestamp');

var deliminators = [' ',',',':','.','?','!'];

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

  var k = config.colCount - residueLength - 1;

  // console.log("msg: "+msg);
  var array = msg.split(/[\s,.:?!]/);
  // console.log("Array: "+JSON.stringify(array));

  var arrIndex = 0;
  var charIndex = 0;
  var prevIndex = 0;
  var first = " : ";
  var spaceString = "";
  for(var i=0;i<padding;i++){
    spaceString += " ";
  }
  if(msg.length > config.colCount){
    while(charIndex < msg.length && arrIndex < array.length){
      var temp  = "";
      console.log("Array element: "+array[arrIndex]);
      while(array[arrIndex]){
        console.log("Inside while");
        if(temp.length+residueLength+array[arrIndex].length > config.colCount){
          break;
        }
        temp += array[arrIndex];
        // console.log("Temp: "+temp);
        charIndex = charIndex + (array[arrIndex]).length;
        arrIndex++;
        if(array[arrIndex]===""){
          arrIndex++;
        }
        // console.log("Next: "+array[arrIndex]+"  \nnext Char: "+msg[charIndex]+"  charIndex:"+charIndex);
        while(deliminators.indexOf(msg[charIndex])!==-1 && msg[charIndex]){
          console.log("Current special char: "+msg[charIndex]+"   temp: "+temp);
          temp += msg[charIndex];
          charIndex++;
        }
        console.log("Exiting");
      }
      console.log("Outside loop exit");

      if(charIndex === prevIndex){
        arrIndex++;
      }else{
        string+=colors[color](first+temp);
        first = "\n"+spaceString;
        residueLength = padding;
      }
      prevIndex = charIndex;
      // console.log("CharIndex: "+charIndex);
    }
  //   var temp = msg.substring(0, (config.colCount-residueLength-1));
  //   var index = k;
  //   var c=0;
  //     console.log("Char: "+msg[index]);
  //   while(deliminators.indexOf(msg[index])!==-1 && c<=10){
  //     console.log("Char: "+msg[index]+"    index: "+index);
  //     index--;
  //     c++;
  //   }
  //   if(c<=10){
  //     k = k - c;
  //   }
  //   console.log("K: "+k+"\tc: "+c);
  //   string+=colors[color](" : "+msg.substring(0,k));
}else{
  string+=colors[color](" : "+msg);
}


  // while(k < length){
  //   var s = "";
  //   for(var i = 0;i<padding;i++){
  //     s+=" ";
  //   }
  //   string += colors[color]("\n" +s+msg.substring(k, k+ config.colCount - padding -1 ));
  //   // console.log("String: "+string+"\nk: "+k+"\nlength: "+length+"\nfactor: "+(config.colCount - k - padding -1));
  //   k = k +(config.colCount - padding -1);
  // }




  console.log(string);
}

module.exports = showMsg;
