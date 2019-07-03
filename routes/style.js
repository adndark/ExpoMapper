var path = require("path");

module.exports = function(app) {

    // Routes for javascript files
    app.get("/css/:file", function(req, res) {
        var file = req.params.file;
        res.sendFile(path.join(__dirname, "../views/css/" + file));
    });
};