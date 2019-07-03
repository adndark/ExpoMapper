var path = require("path");

module.exports = function(app) {

    // Routes for javascript files
    app.get("/lib/:file", function(req, res) {
        var file = req.params.file;
        res.sendFile(path.join(__dirname, "../lib/" + file));
    });

    app.get("/lib/newMap/:file", function(req, res) {
        var file = req.params.file;
        console.log(file);
        res.sendFile(path.join(__dirname, "../lib/newMap/" + file));
    });
  
};