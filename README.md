# Android Log Cat Inspired Logger for NodeJS

A simple logger x

##Usage

```
var Log = require('jlogger');

<!-- Log.addGlobalConfig("projectName", "<your project name>"); //Usage under development
Log.addGlobalConfig("projectRoot", "<your project root>"); //Usage under development
 -->
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

```
Log.hr(length, showTimestamp, color, tag, char);
```

length: *Number*        Number of characters to draw. Default is set by global Config
showTimeStamp:  *true/false*      Whether to show timestamp. Default is false
color: *color name*     Color for the horizontal line
tag: *tag*     tag for hr
char: *"="*     String with which the hr is to be drawn. (tag parameter should be present, atleast an empty placeholder)
