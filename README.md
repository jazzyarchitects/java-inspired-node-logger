# Android Log Cat Inspired Logger for NodeJS

This is still under active development.

##Usage

```
var Log = require('jlogger');

Log.addGlobalConfig("projectName", "<your project name>"); //Usage under development 
Log.addGlobalConfig("projectRoot", "<your project root>"); //Usage under development
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
```

If you want a new instance of the Logger, having different properties from global config use:

```
var Log = require('jlogger');
var Log2 = new Log.Logger({"defaultTag": "another default tag"});

Log2.e(TAG, "Another instance of logger");
// or
Log.e("Msg with default TAG");

```
