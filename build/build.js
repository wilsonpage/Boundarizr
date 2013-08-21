/**
 * You're going to need to do `npm install uglify-js` first in order to use
 * this script.
 */
var UglifyJS = require("uglify-js");
var FS = require('fs');
var result = UglifyJS.minify (["../js/boundarizr.js"]);
var style = "<style>a { border-radius: 3px; padding: 5px; background: #ccc;" +
    " color: black; text-decoration: none; border: 1px solid #aaa;}</style>";

FS.writeFileSync('../js/boundarizer.min.js', result.code);

result.code = style + "<a href='javascript:(function() {" + result.code +
    "Boundarizr.testCurrentDocument();})();'>Show Layout Boundaries</a>";

FS.writeFileSync('../bookmarklet.html', result.code);
