const Joi = require("joi");
const { debeSer, numerico, entero, estado, pagina, tamanio, mensaje } = require("../utils/messages");

const queryInputTipoVisitantes = Joi.object({
  nombre: Joi.string().optional().allow(null).allow('').empty('').default(''),
  estado: Joi.number().optional().integer().allow(null).default(0).messages({
      "number.base": mensaje(debeSer,estado,numerico),
      "number.integer": mensaje(debeSer,estado,entero),
    }),
  idempresa: Joi.string().optional().allow(null).allow('').empty('').default(''),
  ordenamiento: Joi.string().optional().allow(null).allow('').empty('').default('fechacreacion desc'),
  tamanio: Joi.number().optional().integer().allow(null).default(0).messages({
      "number.base": mensaje(debeSer,tamanio,numerico),
      "number.integer": mensaje(debeSer,tamanio,entero),
    }),
  pagina: Joi.number().optional().integer().allow(null).default(1).messages({
      "number.base": mensaje(debeSer,pagina,numerico),
      "number.integer": mensaje(debeSer,pagina,entero),    
    }),
});

module.exports = { queryInputTipoVisitantes };