module.exports = function(sequelize, DataTypes) {
    // Creating new Section table 
    var Section = sequelize.define("Section", {
        sectionName: {
            type: DataTypes.STRING,
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
        locationId: {
            type: DataTypes.STRING,
        },
    });

    Section.associate = function(models) {

        Section.belongsTo(models.Floor, {
            foreignKey: {
                allowNull: false
            }
        });

        Section.hasMany(models.Stand, {
        });
    };


    return Section;
};