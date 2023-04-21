const { DataTypes } = require("sequelize");
const { sq } = require("../database/config");

const Nomenclatura = sq.define(
    "nomenclatura", {
        id: {
            field: 'idnomenclatura',
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        abreviatura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contador: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        longitud: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fechacreacion: {
            type: 'TIMESTAMP',             
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
        timestamps: false
    }
);

module.exports = { Nomenclatura }