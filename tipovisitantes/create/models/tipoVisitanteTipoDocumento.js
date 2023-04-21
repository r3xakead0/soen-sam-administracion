const { DataTypes } = require("sequelize");
const { sq } = require("../database/config");

const TipoVisitanteTipoDocumento = sq.define(
    "tipovisitantetipodocumento", {
        id: {
            field: 'idtipovisitantetipodocumento',
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        idtipovisitante: {
            type: DataTypes.UUID,
            allowNull: false
        },
        idtipodocumento: {
            type: DataTypes.UUID,
            allowNull: true
        },
        esobligatorio: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        esprincipal: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = { TipoVisitanteTipoDocumento }