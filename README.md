# Android Log Cat Inspired Logger for NodeJS  
[![Latest Stable Version](https://img.shields.io/npm/v/jlogger.svg)](https://www.npmjs.com/package/jlogger)
[![License](https://img.shields.io/npm/l/jlogger.svg)](https://www.npmjs.com/package/jlogger)
[![NPM Downloads](https://img.shields.io/npm/dt/jlogger.svg)](https://www.npmjs.com/package/jlogger)
[![NPM Downloads](https://img.shields.io/npm/dm/jlogger.svg)](https://www.npmjs.com/package/jlogger)

###Installation  
***
```
$ npm install --save jlogger
```

A simple logger inspired by Android LogCat for NodeJS.  
This logger provides functions like *_Log.e(), Log.w(), Log.i()_* and *_Log.d()_* as in Android App Development.  
The display is as 

<a href="https://github.com/jazzyarchitects/java-inspired-node-logger/blob/master/test/server.js" target="_blank">Source code for screenshot </a>  
<img src="https://github.com/jazzyarchitects/java-inspired-node-logger/blob/master/images/shell.png" />

##Usage
***
```
var Log = require('jlogger');

Log.addGlobalConfig("defaultTag", "defaultTag");  //Default tag for every log

var TAG = "some TAG";

Log.e(TAG, "your msg"); //This msg will be in red
Log.error(TAG, "your msg"); //This msg will be in red

Log.w(TAG, "msg"); //In yellow
Log.warn(TAG, "msg"); //In yellow

Log.i(TAG, "msg"); //In green
Log.info(TAG, "msg"); //In green

Log.d(TAG, "msg"); //This is white

Log.d("blue", TAG, "msg"); //Specify color
Log.debug(color, TAG, "msg"); //Specify color. Default is white

Log.hr(length);  //Draw a dashed horizontal line. Default length is that of the terminal
```

If you want a new instance of the Logger, having different properties from global config use:

```
var Log = require('jlogger');
var Log2 = new Log.Logger({"defaultTag": "another default tag"});

Log2.e(TAG, "Another instance of logger");
// or
Log.e("Msg with default TAG");

```

### Available customisations are:
***
```
Log.setGlobalConfig({
  "defaultTag": "<your default tag name>",  //Default tag for when tag is not specified
  "tagBold": <true/false>,  //If true then tags will be in bold,
  "hrLength": <length of hr>,   //Default length of horizontal line. If not specified then it fits to terminal size
  "hrChar": "=",  //Draw horizontal line with specified character. Default is "-"
  "adaptScreenSize": <true/false>, //If true then hr width will fit the current terminal size
  "projectName": "<your project name>",  //Display this in your log
  "showProjectName": <true/false>,  //If false then project name is not printing in log. Default is true
});

```


### Using Log.hr()
***
```
Log.hr(length, showTimestamp, color, tag, char);
```

*_length_*: *Number*        Number of characters to draw. Default is set by global Config  
*_showTimeStamp_*:  *true/false*      Whether to show timestamp. Default is false  
*_color_*: *color name*     Color for the horizontal line  
*_tag_*: *tag*     tag for hr  
*_char_*: *"="*     String with which the hr is to be drawn. (tag parameter should be present, atleast an empty placeholder)  

###JSON formatting  
No need to stringify the json to display. The module displays it with correct indentation.
```
var obj = {
   name: "Jibin Mathews",
   email: "jibinmathews7@gmail.com"
};

Log.e(TAG, obj);
or
Log.d("blue", TAG, obj);
```

***
##Release Notes  
1. Release 1.2.0  
    * Added JSON formatting
    * Text wrapping (Changed from character based wrapping to word based wrapping)
    * Bug fix with setting config
2. Release 1.1.0
    * Added horizontal rule
3. Release 1.0.0
    * Initial Release
