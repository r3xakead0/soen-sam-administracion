const { TipoVisitante } = require("./models/tipoVisitante");
const { TipoVisitanteTipoDocumento } = require("./models/tipoVisitanteTipoDocumento");

const { noExiste, tipoVisitanteSingular, idPaisPeru, guardar, mensaje } = require("./utils/messages");
const { OK, ERROR, SC_INTERNAL_SERVER_ERROR, SC_UNPROCESSABLE_CONTENT, CREAR, EDITAR } = require("./utils/status");
const { configurarArrayErrores, agregarMensajeError, mostrarMensajeError, generarCodigo, fechaActual, validarCatalogoCodigo } = require("./utils/helper");

const CheckStatus = require("./utils/status");
const { inputTipoVisitante } = require("./validations/inputTipoVisitante");

const { validate: uuidValidate } = require('uuid');
const { v4: uuid } = require('uuid');
const { Op } = require("sequelize");

exports.createTipoVisitante = async (event) => {

  if (event.httpMethod !== 'POST') {
      throw new Error(`createTipoVisitante only accepts POST method, you tried: ${event.httpMethod} method.`);
  }

  // All log statements are written to CloudWatch
  console.info('received:', event);

  const checkStatus = new CheckStatus();
  let statusCode = SC_INTERNAL_SERVER_ERROR;

  try {

      const body = JSON.parse(event.body)
      body.accion = CREAR;

      await validate(body, function(data) {
          checkStatus.apiEstado = data.apiEstado;
          checkStatus.apiMensaje = data.apiMensaje;
      });

      if (checkStatus.apiEstado === OK) {

          let codigo = await generarCodigo("Tipo de Visitante");
          let nombreusuario = 'admin';
          let fecha = fechaActual();
      
          const tipoVisitante = await TipoVisitante.create({
            id: uuid(),
            codigo: codigo,
            nombre: body.nombre,
            tipo: body.tipo,
            idpais: idPaisPeru, //Mensaje
            idtercero: body.idtercero,
            fechacreacion: fecha,
            usuariocreacion: nombreusuario,
            fechaedicion: fecha,
            usuarioedicion: nombreusuario,
            estado: body.estado,
            eliminado: false
          });
      
          for (let i = 0; i < body.tipodocumentos.length; i++) {
            await TipoVisitanteTipoDocumento.create({
                id: uuid(),
                orden: i + 1,
                idtipovisitante: tipoVisitante.id,
                idtipodocumento: body.tipodocumentos[i].idtipodocumento,
                esobligatorio: body.tipodocumentos[i].obligatorio,
                esprincipal: body.tipodocumentos[i].esprincipal,
                fechacreacion: fecha,
                usuariocreacion: nombreusuario,
                fechaedicion: fecha,
                usuarioedicion: nombreusuario,
                eliminado: false
            });
          }
          
          statusCode= SC_CREATED; //Created success
      
          checkStatus.id = tipoVisitante.id;
          checkStatus.codigo = tipoVisitante.codigo;
          checkStatus.apiEstado = OK;
          checkStatus.apiMensaje = mensaje(guardar, tipoVisitanteSingular);
      
    } else {
      statusCode = SC_UNPROCESSABLE_CONTENT; //Unprocessable Content
    }

  } catch (ex) {
      statusCode= SC_INTERNAL_SERVER_ERROR; //Internal Server Error

      checkStatus.apiEstado = ERROR;
      checkStatus.apiMensaje = ex.message.toString();
  }

  let response = {
      statusCode: statusCode,
      body: JSON.stringify(checkStatus)
  }  
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  
  return response;
};

async function validate (obj, callback) {
  
  const checkStatus = new CheckStatus();
  let mensajes = [];

  try {
      await inputTipoVisitante.validateAsync(obj, { abortEarly: false, allowUnknown: true });
      checkStatus.apiEstado = OK;

  } catch (error) {
      mensajes = configurarArrayErrores(error.details);
  }

  if (obj.accion === EDITAR) {
      if (!uuidValidate(obj.id)) {
          mensajes = [{ id: 'id', texto: mensaje(debeSeleccionarUNValido, id) }].concat(mensajes);
      }
  }

  if (obj.nombre !== undefined && obj.nombre.length > 0) {

      if (obj.accion === CREAR) {
          if (await TipoVisitante.findOne({
                  where: {
                      nombre: {
                          [Op.iLike]: obj.nombre
                      },
                      eliminado: false
                  }
              })) {
              mensajes = agregarMensajeError(mensajes, { id: 'nombre', texto: tipovisitanteNombreDuplicado });
          }
      } else if (obj.accion === EDITAR && uuidValidate(obj.id)) {
          if (await TipoVisitante.findOne({
                  where: {
                      nombre: {
                          [Op.iLike]: obj.nombre
                      },
                      id: {
                          [Op.ne]: obj.id //ne
                      },
                      eliminado: false
                  }
              })) {
              mensajes = agregarMensajeError(mensajes, { id: 'nombre', texto: tipovisitanteNombreDuplicado });
          }
      }
  }

  if (obj.tipo !== undefined && obj.tipo > 0) {
      if (await validarCatalogoCodigo(20400, obj.tipo) === false) {
          agregarMensajeError(mensajes, { id: 'tipo', texto: mensaje(debeSeleccionarUNValido, tipo) });
      }
  }

  if (obj.estado !== undefined && obj.estado > 0) {
      if (await validarCatalogoCodigo(20600, obj.estado) === false) {
          agregarMensajeError(mensajes, { id: 'estado', texto: mensaje(debeSeleccionarUNValido, estado) });
      }
  }

  if (obj.accion === EDITAR && obj.tipodocumentos !== undefined && obj.tipodocumentos.length > 0) {
      let mensajeErrorTipoDocumento = '';
      for (let i = 0; i < obj.tipodocumentos.length; i++) {

          if (obj.tipodocumentos[i].idtipodocumento !== undefined &&
              obj.tipodocumentos[i].idtipodocumento.length > 0) {
              if (!uuidValidate(obj.tipodocumentos[i].idtipodocumento)) {
                  mensajeErrorTipoDocumento = mensaje(debeIngresar, tipoDocumentoSingular);
                  break;
              } else {
                  const atributo = await TipoDocumento.findOne({
                      where: {
                          id: obj.tipodocumentos[i].idtipodocumento,
                          eliminado: false
                      }
                  });
                  if (atributo === null) {
                      mensajeErrorTipoDocumento = mensaje(noExiste, tipoDocumentoSingular);
                      break;
                  }
              }
          } else {
              mensajeErrorTipoDocumento = mensaje(noExiste, tipoDocumentoSingular);
              break;
          }
      }

      if (mensajeErrorTipoDocumento.length > 0) {
          mensajes = agregarMensajeError(mensajes, { id: 'tipodocumentos', texto: mensajeErrorTipoDocumento });
      }
  }

  if (mensajes.length > 0) {
      checkStatus.apiEstado = ERROR;
      checkStatus.apiMensaje = mostrarMensajeError(mensajes);
  }

  return callback(checkStatus);
}