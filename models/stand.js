module.exports = function(sequelize, DataTypes) {
    // New Stand table
    var Stand = sequelize.define("Stand", {
        standName: {
            type: DataTypes.STRING,
        },
        locationId: {
            type: DataTypes.STRING,
        },
    });

    // Stands belongs to Artisan Model - Stands can not have more than one artisan.
    Stand.associate = function(models) {
        Stand.belongsTo(models.Artisan, {
            foreignKey: {
                allowNull: true
            }
        });

        Stand.belongsTo(models.Section, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Stand;
};