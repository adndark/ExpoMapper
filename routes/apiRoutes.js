var db = require("../models");

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
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

//  ----------------Artisan Routes ------------------------ //

  // Get all artisans
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
  app.get("/api/artisans/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbArtisan) {
      res.json(dbArtisan);
    });
  });

  
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
  app.get("/api/sections/:id", function(req, res) {
    db.Section.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbSection) {
      res.json(dbSection);
    });
  });

};
