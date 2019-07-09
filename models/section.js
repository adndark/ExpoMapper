module.exports = function(sequelize, DataTypes) {
    // Creating new Section table 
    var Section = sequelize.define("Section", {
        sectionName: {
            type: DataTypes.STRING,
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
    });

    Section.associate = function(models) {
        Section.belongsTo(models.Floor, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    // Section has many stands
    Section.associate = function(models) {
        Section.hasMany(models.Stand, {

        });
    };


    return Section;
};