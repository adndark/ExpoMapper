var path = require("path");

module.exports = function(app) {

    // Routes for javascript files
    app.get("/lib/fabric-min.js", function(req, res) {
      res.sendFile(path.join(__dirname, "../lib/fabric-min.js"));
    });
  
};