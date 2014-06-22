/**
 * Created by pablo on 21/06/14.
 */
var fs = require('fs');

module.exports = function(app, __dirname) {
    fs.readdir(__dirname, function (error, list) {
        if (error) {
            console.log("Could not access " + __dirname);
            console.log(error.message);
            throw error;
        } else {
           list.forEach(function(file) {
               if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
                   return
               console.log("Requiring " + file)
               var name = file.substr(0, file.indexOf('.'));
               require('./' + __dirname + "/" + name)(app);
           });
        }
    });
}
