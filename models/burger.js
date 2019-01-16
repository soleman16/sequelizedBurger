module.exports = function (sequelize, DataTypes) {

    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Burger name must be between 1 and 30 characters in legnth"
                }
            }
        },

        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate:{
                isBoolean: true
            }
        }
    },
        {
            freezeTableName: true
        });

    Burger.associate = function (models) {
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: true
            }
        });
    }

    return Burger;
};