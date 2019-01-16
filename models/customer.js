module.exports = function (sequelize, DataTypes) {

    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING(50),
            allowNull: false, 
            validate: {
                len: {
                    args: [2, 20],
                    msg: "Customer name must be between 2 and 20 characters in legnth"
                }
            }
        }
    },
        {
            freezeTableName: true
        });

    return Customer;
};