module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define("Plan", {

        plan_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        duration_minutes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true

        }

        }, {
        tableName: "plans",
        timestamps: false
    });
    
        Plan.associate = (models) => {
        Plan.hasMany(models.Session);
        Plan.hasMany(models.Payment);

 }
    return Plan;
};
