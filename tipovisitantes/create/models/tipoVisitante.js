const { DataTypes } = require("sequelize");
const { sq } = require("../database/config");

const TipoVisitante = sq.define(
    "tipovisitante", {
        id: {
            field: 'idtipovisitante',
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },   
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },   
        idpais: {            
            type: DataTypes.UUID,            
            allowNull: false
        },
        idtercero: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fechacreacion: {
            type: 'TIMESTAMP',             
            allowNull: false
        },
        usuariocreacion: {
            type: DataTypes.STRING,
        },
        fechaedicion: {
            type: 'TIMESTAMP',             
            allowNull: true
        },
        usuarioedicion: {
            type: DataTypes.STRING,
            allowNull: true
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

module.exports = { TipoVisitante }