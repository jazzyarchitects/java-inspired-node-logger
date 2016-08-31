"use strict";

var showMsg = require('./show-msg').showMsg;

function Log(config) {
  var warn;
  require('./show-msg').config(config);
  // this.warn = function(tag, msg){
  //   showMsg("yellow", tag, msg);
  // }

  // this.w = function(tag , msg){
  //   showMsg("yellow", tag, msg);
  // }

  // this.error = function(tag, msg){
  //   showMsg("red", tag, msg);
  // }

  // this.e = function(tag, msg){
  //   showMsg("red", tag, msg);
  // }

  // this.log = function(tag, msg){
  //   showMsg("white", tag, msg);
  // }

  // this.l = function(tag, msg){
  //   showMsg("white", tag, msg);
  // }

  // this.info = function(tag, msg){
  //   showMsg("green", tag, msg);
  // }

  // this.i = function(tag, msg){
  //   showMsg("green", tag, msg);
  // }

  // this.debug = function(color, tag, msg){
  //   if(arguments.length < 3){
  //     color = null;
  //     tag = arguments[0];
  //     msg = arguments[1];
  //   }
  //   if(tag && !msg){
  //     msg = tag;
  //     tag = undefined;
  //   }
  //   if(!color){
  //     color = "white";
  //   }
  //   showMsg(color, tag, msg);
  // }

  // this.d = function(color, tag, msg){
  //   if(arguments.length < 3){
  //     color = null;
  //     tag = arguments[0];
  //     msg = arguments[1];
  //   }
  //   if(!color){
  //     color = "white";
  //   }
  //   showMsg(color, tag, msg);
  // },

  // this.config =  function(config){
  //   showMsg.config(config);
  // }

}

Log.prototype.warn = function(tag, msg){
  showMsg("yellow", tag, msg);
}

Log.prototype.w = function(tag , msg){
  showMsg("yellow", tag, msg);
}

Log.prototype.error = function(tag, msg){
  showMsg("red", tag, msg);
}

Log.prototype.e = function(tag, msg){
  showMsg("red", tag, msg);
}

Log.prototype.log = function(tag, msg){
  showMsg("white", tag, msg);
}

Log.prototype.l = function(tag, msg){
  showMsg("white", tag, msg);
}

Log.prototype.info = function(tag, msg){
  showMsg("green", tag, msg);
}

Log.prototype.i = function(tag, msg){
  showMsg("green", tag, msg);
}

Log.prototype.debug = function(color, tag, msg){
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
}

Log.prototype.d = function(color, tag, msg){
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

Log.prototype.config =  function(config){
  showMsg.config(config);
}


module.exports = Log;
