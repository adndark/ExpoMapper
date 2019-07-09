module.exports = function (sequelize, DataTypes) {
  var Artisan = sequelize.define("Artisan", {
    ArtisanName: {
      type: DataTypes.STRING,

    },
    phone: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    companyAsso: {
      type: DataTypes.STRING,
    },
    community: {
      type: DataTypes.STRING,
    },
    craft: {
      type: DataTypes.STRING,
    },
    rawMaterial: {
      type: DataTypes.STRING,
    },
    finalProduct: {
      type: DataTypes.STRING,
    },
    assignee: {
      type: DataTypes.STRING,
    },
    aditionalInfo: {
      type: DataTypes.TEXT,

    }

  });

  Artisan.associate = function (models) {
    Artisan.hasMany(models.Stand, {

    });
   };

  Artisan.associate = function (models) {
    Artisan.belongsTo(models.User, {

  })
  };

  return Artisan;
};
