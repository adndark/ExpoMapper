module.exports = function(sequelize, DataTypes) {
    // Creating new User table 
    var User = sequelize.define("User", {
        username: {
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
    // One user has mamy artisans. 
    User.associate = function(models) {
        User.hasMany(models.Artisan, {

        })
    };

    // One user has many floors.
    User.associate = function(models) {
        User.hasMany(models.Floor, {

        });
    };

    return User;
};