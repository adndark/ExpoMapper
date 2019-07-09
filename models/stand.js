module.exports = function(sequelize, DataTypes) {
    // New Stand table
    var Stand = sequelize.define("Stand", {
        standName: {
            type: DataTypes.STRING,
        },
        artisan: {
            type: DataTypes.STRING,
        },
    });
    // Stands belongs to Artisan Model - Stands can not have more than one artisan.
    Stand.associate = function(models) {
        Stand.belongsTo(models.Artisan, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Stand.associate = function(models) {
        Stand.belongsTo(models.Section, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Stand;
};