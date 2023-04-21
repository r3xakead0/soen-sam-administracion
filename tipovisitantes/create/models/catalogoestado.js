const { DataTypes } = require("sequelize");
const { sq } = require("../database/config");

const CatalogoEstado = sq.define(
    "catalogoestado", {
        id: {
            field: 'idcatalogoestado',
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        codigo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },       
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false            
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    }  
);

module.exports = { CatalogoEstado }