'use strict';
module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define('ForgotPassword', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nasabahId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'forgot_password'
  });
  
  ForgotPassword.associate = function(models) {
    ForgotPassword.belongsTo(models.DaftarNasabah, { 
      foreignKey: 'nasabahId',
      as: 'nasabah',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return ForgotPassword;
};
