"use strict";

var moment = require('moment');

var timeNow = function(date){
  if(!date){
    date = new Date();
  }
  return moment(date).format("DD-MM HH:mm:ss:SSS");
}

module.exports = timeNow;
