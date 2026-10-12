module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {

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

        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },

        end_time: {
            type: DataTypes.DATE,
            allowNull: true
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false
        }

         }, {
        tableName: "sessions",
        timestamps: false
    });

    Session.associate = (models) => {
        Session.belongsTo(models.User);
        Session.belongsTo(models.WifiMachine);
        Session.belongsTo(models.Plan);

    }

    return Session;
};
