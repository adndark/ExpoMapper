module.exports = function(sequelize, DataTypes) {
    // Creating new floor table into the DB.
    var Floor = sequelize.define("Floor", {
        floorName: {
            type: DataTypes.STRING,
        },
        floorObject: {
            type: DataTypes.STRING,
        },
    });
    // Floor belongs to User Model - The user could have many floors.
    Floor.associate = function(models) {
        Floor.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        // Floor has many sections.
        Floor.hasMany(models.Section, {

        });
    };
    return Floor;
};