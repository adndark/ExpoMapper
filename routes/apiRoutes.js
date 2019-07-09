// Import database variable
var db = require("../models");

// Define api routes
module.exports = function(app) {
    // Get all users
    app.get("/api/users", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Create a new  user
    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Delete an user by id
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
<<<<<<< Updated upstream

    // Get users by id
=======
>>>>>>> Stashed changes
    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
<<<<<<< Updated upstream
    });

    // Get a user by id
    app.put("/api/users/:id", function(req, res) {
        db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
=======


        app.put("/api/users/:id", function(req, res) {
            db.User.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then(function(dbUser) {
                res.json(dbUser);
            });
>>>>>>> Stashed changes
        });
    });

    //  ----------------Artisan Routes ------------------------ //
<<<<<<< Updated upstream
    // Get all artisans that belong to a user id
=======

    // Get all artisans
>>>>>>> Stashed changes
    app.get("/api/artisansByUserId/:id", function(req, res) {
        db.Artisan.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

<<<<<<< Updated upstream
    // Get all artisans in DB, bad bad idea
=======

>>>>>>> Stashed changes
    app.get("/api/artisans", function(req, res) {
        db.Artisan.findAll({}).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

    // Create a new  artisan
    app.post("/api/artisans", function(req, res) {
        db.Artisan.create(req.body).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

    // Delete an artisan by id
    app.delete("/api/artisans/:id", function(req, res) {
        db.Artisan.destroy({ where: { id: req.params.id } }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });
<<<<<<< Updated upstream

    // Get artisan by id
=======
>>>>>>> Stashed changes
    app.get("/api/artisans/:id", function(req, res) {
        db.Artisan.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });
<<<<<<< Updated upstream

    // Update artisan by id
=======
>>>>>>> Stashed changes
    app.put("/api/artisans/:id", function(req, res) {
        db.Artisan.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    //  ----------------Section Routes ------------------------ //

    // Get all sections
    app.get("/api/sections", function(req, res) {
        db.Section.findAll({}).then(function(dbSection) {
            res.json(dbSection);
        });
    });

    // Create a new section
    app.post("/api/sections", function(req, res) {
        db.Section.create(req.body).then(function(dbSection) {
            res.json(dbSection);
        });
    });

    // Delete an Section by id
    app.delete("/api/sections/:id", function(req, res) {
        db.Section.destroy({ where: { id: req.params.id } }).then(function(dbSection) {
            res.json(dbSection);
        });
    });
<<<<<<< Updated upstream

    // Get sections by id
=======
>>>>>>> Stashed changes
    app.get("/api/sections/:id", function(req, res) {
        db.Section.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbSection) {
            res.json(dbSection);
        });
    });

<<<<<<< Updated upstream
    // Update section by id
=======
>>>>>>> Stashed changes
    app.put("/api/sections/:id", function(req, res) {
        db.Section.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbSection) {
            res.json(dbSection);
        });
    });

<<<<<<< Updated upstream
=======



>>>>>>> Stashed changes
    //  ----------------Stand Routes ------------------------ //

    // Get all stand
    app.get("/api/stands", function(req, res) {
        db.Stand.findAll({}).then(function(dbStand) {
            res.json(dbStand);
        });
    });

    // Create a new stand
    app.post("/api/stands", function(req, res) {
        db.Stand.create(req.body).then(function(dbStand) {
            res.json(dbStand);
        });
    });

    // Delete an Stand by id
    app.delete("/api/stands/:id", function(req, res) {
        db.Stand.destroy({ where: { id: req.params.id } }).then(function(dbStand) {
            res.json(dbStand);
        });
    });
<<<<<<< Updated upstream

    // Get stand by id
=======
>>>>>>> Stashed changes
    app.get("/api/stands/:id", function(req, res) {
        db.Stand.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbStand) {
            res.json(dbStand);
        });
    });
<<<<<<< Updated upstream

    // Update stand by id
=======
>>>>>>> Stashed changes
    app.put("/api/stands/:id", function(req, res) {
        db.Stand.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbStand) {
            res.json(dbStand);
        });
    });
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
};