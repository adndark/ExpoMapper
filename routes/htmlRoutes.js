var path = require("path");

module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../views/index.html"));
    });
    app.get("/newMap", function(req, res) {
      res.sendFile(path.join(__dirname, "../views/newMap.html"));
    });
    app.get("/artisan", function(req, res) {
      res.sendFile(path.join(__dirname, "../views/artisan.html"));
    });
    app.get("/test", function(req, res) {
        console.log("Request to get test");
      res.sendFile(path.join(__dirname, "../public/test.html"));
    });
  
};