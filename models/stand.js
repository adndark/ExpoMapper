module.exports = function(sequelize, DataTypes) {
    var Stand = sequelize.define("Stand", {
      standName: {
        type: DataTypes.STRING,
      },
      artisan : {
        type: DataTypes.STRING,
      },
    });

    Stand.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Stand.belongsTo(models.Artisan, {
        foreignKey: {
          allowNull: false
        }
      });
    };


    return Stand;
  };
  