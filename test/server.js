console.log("Hello world. Starting test");


var newLog = new require('..');
// newLog.config({name: 'jibin'});
// newLog.addGlobalConfig('defaultTag', "this is default tag");

console.log("Start Time: "+(new Date).getTime());
newLog.e( "This should be new error");
newLog.w("Tag", "This should be new warn");
newLog.i("Tag", "This should be new info");
newLog.d("Tag", "This should be new debug");

// Log.hr();

var Log = require('..');


// Log.config({'defaultTag': "nothing"});

Log.e("This is error");
Log.w("This is warning");
Log.i("This is info");
Log.d("This is debug");

Log.hr();

var Log2 = require('..');
var Log2 = new Log2.Logger({'defaultTag': "Jibin", "hrChar": "*", "projectName": "MyTestAPp", "tagBold": true,"showProjectName":false});
// Log2.config();

Log2.e("This is error");
Log2.w("This is warning");
Log2.i("This is info");
Log2.d("This is debug");

Log2.d("blue", "", "This is debug");


Log2.hr(15, true, "green", "", "=");
