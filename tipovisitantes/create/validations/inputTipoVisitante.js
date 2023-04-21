const Joi = require("joi"); 
const { debeSer,debeIngresar,debeSeleccionarUNValido,
    tipoDocumentoSingular,
  cadena, numerico, entero, booleano,
  nombre, tipo, estado,
  idAtributo, tipovisitanteTipoDocumentoDuplicado,
  obligatorio, 
  mensaje} = require("../utils/messages");

const inputTipoVisitante = Joi.object({    
    nombre: Joi.string().required().messages({        
        "string.base": mensaje(debeSer,nombre,cadena),
        "string.empty": mensaje(debeIngresar,nombre),
        "any.required": mensaje(debeIngresar,nombre),
    }),
    tipo: Joi.number().required().integer().min(1).messages({
        "number.base": mensaje(debeSer,tipo,numerico),
        "number.integer": mensaje(debeSer,tipo,entero),
        "number.min": mensaje(debeSeleccionarUNValido,tipo),
        "any.required": mensaje(debeSeleccionarUNValido,tipo),
    }),
    estado: Joi.number().required().integer().min(1).messages({
        "number.base": mensaje(debeSer,estado,numerico),
        "number.integer": mensaje(debeSer,estado,entero),
        "number.min": mensaje(debeSeleccionarUNValido,estado),
        "any.required": mensaje(debeSeleccionarUNValido,estado),
    }),     
    tipodocumentos: Joi.array().items({
        idtipodocumento: Joi.string().allow("").messages({ 
            "string.base": mensaje(debeSer,idAtributo,cadena)         
        }),
        obligatorio: Joi.bool().required().messages({ 
            "boolean.base": mensaje(debeSer,obligatorio,booleano),
            "boolean.empty": mensaje(debeIngresar,obligatorio),
        }),
      }).unique((a, b) => a.idtipodocumento === b.idtipodocumento).required().messages({
        "any.required": mensaje(debeSeleccionarUNValido,tipoDocumentoSingular),
        "array.unique": mensaje(tipovisitanteTipoDocumentoDuplicado)
    })
});

module.exports = { inputTipoVisitante } 