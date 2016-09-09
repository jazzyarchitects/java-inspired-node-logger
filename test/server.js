// console.log("Hello world. Starting test");


// var newLog = new require('..');
// // newLog.config({name: 'jibin'});
// // newLog.addGlobalConfig('defaultTag', "this is default tag");

// console.log("Start Time: "+(new Date).getTime());
// newLog.e( "This should be new error");
// newLog.w("Tag", "This should be new warn");
// newLog.i("Tag", "This should be new info");
// newLog.d("Tag", "This should be new debug");

// // Log.hr();

// var Log = require('..');


// // Log.config({'defaultTag': "nothing"});

// Log.e("This is error");
// Log.w("This is warning");
// Log.i("This is info");
// Log.d("This is debug");

// Log.hr();

var Log2 = require('..');
var Log2 = new Log2.Logger({'defaultTag': "Jibin", "hrChar": "*", "projectName": "MyTestAPp", "tagBold": true,"showProjectName":false});
// Log2.config();

// Log2.e("This is error");
// Log2.w("This is warning");
Log2.i("Node.js is an open-source, cross-platform JavaScript runtime environment for developing a diverse variety of tools and applications. Although Node.js is not a JavaScript framework,[3] many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript. The runtime environment interprets JavaScript using Google's V8 JavaScript engine. "+
  "Node.js has an event-driven \n\narchitecture capable of asynchronous I/O. \nThese \ndesign choices aim to optimize throughput and scalability in Web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).");

Log2.e("Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets. Android's user interface is mainly based on direct manipulation, using touch gestures that loosely correspond to real-world actions, such as swiping, tapping and pinching, to manipulate on-screen objects, along with a virtual keyboard for text input. In addition to touchscreen devices, Google has further developed Android TV for televisions, Android Auto for cars, and Android Wear for wrist watches, each with a specialized user interface. Variants of Android are also used on notebooks, game consoles, digital cameras, and other electronics.");
// Log2.d("This is debug");
//
// Log2.d("blue", "", "This is debug");


// Log2.hr(15, true, "green", "", "=");
