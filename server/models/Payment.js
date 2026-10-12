module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        machine_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        payment_method: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false
        },

        paid_at: {
            type: DataTypes.DATE,
            allowNull: true
        }

        }, {
        tableName: "payments",
        timestamps: false
    });

        Payment.associate = (models) => {
        Payment.belongsTo(models.User);
        Payment.belongsTo(models.WifiMachine);
        Payment.belongsTo(models.Plan);
   }
   
    return Payment;
};
