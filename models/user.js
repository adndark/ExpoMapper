module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      userName: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
       password: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      }
    });
    
  User.associate = function (models) {
    User.hasMany(models.Artisan, {

    })
  };

    return User;
  };
  