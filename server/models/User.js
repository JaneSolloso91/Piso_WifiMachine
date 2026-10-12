module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        mac_address: {
            type: DataTypes.STRING,
            allowNull: false
        },

        device_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        
         }, {
        tableName: "users",
        timestamps: false
 
    });

        User.associate = (models) => {
        User.hasMany(models.Session); 
        User.hasMany(models.Payment);           
       
   }
    return User;
};