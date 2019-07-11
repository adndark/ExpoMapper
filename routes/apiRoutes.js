// Import database variable
var db = require("../models");

// Define api routes
module.exports = function(app) {
    // Login
    app.post("/api/login", function(req, res) {
        console.log(req);
        db.User.findOne({
            where: {
                userName: req.body.username,
                password: req.body.password
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

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
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({ type: err.errors[0].type, path: err.errors[0].path });
        });
    });

    // Delete an user by id
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Get users by id
    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Get a user by id
    app.put("/api/users/:id", function(req, res) {
        db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    //  ----------------Artisan Routes ------------------------ //
    // Get all artisans that belong to a user id
    app.get("/api/artisansByUserId/:id", function(req, res) {
        db.Artisan.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

    // Get all artisans in DB, bad bad idea
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

    // Get artisan by id
    app.get("/api/artisans/:id", function(req, res) {
        db.Artisan.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

    // Update artisan by id
    app.put("/api/artisans/:id", function(req, res) {
        db.Artisan.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbArtisan) {
            res.json(dbArtisan);
        });
    });

    //  ----------------Section Routes ------------------------ //

    // Get all sections that belong to a floor id
    app.get("/api/sectionsByFloorId/:id", function(req, res) {
        db.Section.findAll({
            where: {
                FloorId: req.params.id
            },
            include: [{
                model: db.Stand
            }]
        }).then(function(dbSection) {
            res.json(dbSection);
        });
    });

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

    // Get sections by id
    app.get("/api/sections/:id", function(req, res) {
        db.Section.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbSection) {
            res.json(dbSection);
        });
    });

    // Update section by id
    app.put("/api/sections/:id", function(req, res) {
        db.Section.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbSection) {
            res.json(dbSection);
        });
    });

    //  ----------------Stand Routes ------------------------ //
    // Get all stands that belong to a section id
    app.get("/api/standsByFloorId/:id", function(req, res) {
        db.Stand.findAll({
            where: {
                SectionId: req.params.id
            },
            include: [{
                model: db.Section,
                include:[db.Floor]
            },
            {
                model: db.Artisan
            }]
        }).then(function(dbStand) {
            res.json(dbStand);
        });
    });
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

    // Get stand by id
    app.get("/api/stands/:id", function(req, res) {
        db.Stand.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbStand) {
            res.json(dbStand);
        });
    });

    // Update stand by id
    app.put("/api/stands/:id", function(req, res) {
        db.Stand.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbStand) {
            res.json(dbStand);
        });
    });


    //  ----------------Floor Routes ------------------------ //
    // Get all floors that belong to a user id
    app.get("/api/floorsByUserId/:id", function(req, res) {
        db.Floor.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(function(dbFloor) {
            res.json(dbFloor);
        });
    });
    // Get all Floors
    app.get("/api/floors", function(req, res) {
        db.Floor.findAll({}).then(function(dbFloor) {
            res.json(dbFloor);
        });
    });

    // Create a new Floor
    app.post("/api/floors", function(req, res) {
        db.Floor.create(req.body).then(function(dbFloor) {
            res.json(dbFloor);
        });
    });

    // Delete an Floor by id
    app.delete("/api/floors/:id", function(req, res) {
        db.Floor.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbFloor) {
            res.json(dbFloor);
        });
    });

    // Get Floor by id
    app.get("/api/floors/:id", function(req, res) {
        db.Floor.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbFloor) {
            res.json(dbFloor);
        });
    });

    // Update Floor by id
    app.put("/api/floors/:id", function(req, res) {
        db.Floor.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbFloor) {
            res.json(dbFloor);
        });
    });
};