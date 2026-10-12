module.exports = (sequelize, DataTypes) => {
    const WifiMachine = sequelize.define("WifiMachine", {

        machine_code: {
            type: DataTypes.STRING,
            allowNull: false
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ip_address: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        
        }, {
        tableName: "wifi_machines",
        timestamps: false

        });

        WifiMachine.associate = (models) => {
        WifiMachine.hasMany(models.Session);
        WifiMachine.hasMany(models.Payment);

    }

    return WifiMachine;
};
