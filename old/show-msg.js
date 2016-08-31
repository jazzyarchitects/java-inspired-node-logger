"use strict";

var colors = require('colors');

var timeStamp = require('./current-timestamp');
var __config = {};
function showMsg(color, tag, msg){
  var path = __filename.replace(__config.projectRoot, '');
  if(!msg){
    msg = tag;
    tag = "";
  }
  console.log(colors[color](timeStamp()+" "+path+" : ")+colors[color].bold(tag)+colors[color](" : "+msg+" \n"+JSON.stringify(__config)));
}

module.exports = {
  warn: function(tag, msg){
    showMsg("yellow", tag, msg);
  },
  w: function(tag, msg){
    showMsg("yellow", tag, msg)
  },
  error: function(tag, msg){
    showMsg("red", tag, msg);
  },
  e: function(tag, msg){
    showMsg("red", tag, msg);
  },
  log: function(tag, msg){
    showMsg("white", tag, msg);
  },
  l: function(tag, msg){
    showMsg(tag, msg);
  },
  info: function(tag, msg){
    showMsg("green", tag, msg);
  },
  i: function(tag, msg){
    showMsg("green", tag, msg);
  },
  debug: function(color, tag, msg){
    if(arguments.length < 3){
      color = null;
      tag = arguments[0];
      msg = arguments[1];
    }
    if(tag && !msg){
      msg = tag;
      tag = undefined;
    }
    if(!color){
      color = "white";
    }
    showMsg(color, tag, msg);
  },
  d: function(color, tag, msg){
    if(arguments.length < 3){
      color = null;
      tag = arguments[0];
      msg = arguments[1];
    }
    if(!color){
      color = "white";
    }
    showMsg(color, tag, msg);
  },

  config : function(config){
    __config = config;
  },

  showMsg: showMsg,

  newLog: function(config){
    return new require('./logger')(config);
  }
}

// exports.config = function(config){
//   __config = config;
// };

// exports.showMsg = showMsg;

// exports.newLog = function(config){
//   return new require('./logger')(config);
// }
