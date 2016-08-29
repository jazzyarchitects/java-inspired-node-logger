console.log("Hello world. Starting test");


var Log = require('..');

console.log("Log: "+JSON.stringify(Log));

Log.e("This is error");
Log.w("This is warning");
Log.i("This is info");
Log.d("This is debug");
