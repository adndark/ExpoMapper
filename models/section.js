module.exports = function(sequelize, DataTypes) {
    var Section = sequelize.define("Section", {
      sectionName: {
        type: DataTypes.STRING,
      },
      capacity: {
        type: DataTypes.INTEGER,
      },
    });
    return Section;
  };
  