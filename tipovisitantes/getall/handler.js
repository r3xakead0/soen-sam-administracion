const { sq } = require("./database/config");
const { noExiste, tipoVisitantePlural, mensaje } = require("./utils/messages");
const { OK, ERROR, SC_INTERNAL_SERVER_ERROR, SC_OK, SC_NOTFOUND } = require("./utils/status");
const DataQuerySedes = require("./entities/dataQuery");
const { queryInputTipoVisitantes } = require("./validations/queryInputTipoVisitantes");

exports.getTipoVisitantes = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getTipoVisitantes only accept GET method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    const dtoSedes = new DataQuerySedes();
    let statusCode = SC_INTERNAL_SERVER_ERROR;
  
    try {
  
      const queryParams = event.queryStringParameters;
      const { error, value } = queryInputTipoVisitantes.validate(queryParams, { abortEarly: false, allowUnknown: true });
  
      if(error === undefined){
        const uspTipoVisitanteBuscar = "select * from uspTipoVisitanteBuscar(:intexto,:inestado,:inordenamiento,:intamanio,:inpagina);";;

        const [results, metadata] = await sq.query(uspTipoVisitanteBuscar,
                    {
                      replacements: {
                        intexto: value.nombre,
                        inestado: value.estado,
                        inidempresa: value.idempresa,
                        inordenamiento: value.ordenamiento,
                        intamanio: value.tamanio,
                        inpagina: value.pagina
                      },
                      type : sq.QueryTypes.RAW 
                    });
    
        if(results){
          statusCode = SC_OK; //OK
  
          dtoSedes.apiEstado = OK;
          dtoSedes.apiMensaje = "";
          dtoSedes.data = results;
          dtoSedes.total = results.length;
        }
        else{
          statusCode= SC_NOTFOUND; //Not Found
  
          dtoSedes.apiEstado = ERROR;
          dtoSedes.apiMensaje = mensaje(noExiste,tipoVisitantePlural);
          dtoSedes.data = [];
          dtoSedes.total = 0;
        }
      }
      else{
        statusCode= SC_NOTFOUND; //Not Found
  
        dtoSedes.apiEstado = ERROR;
        dtoSedes.apiMensaje = error.message.toString();
        dtoSedes.data = [];
        dtoSedes.total = 0;
      }
  
    } catch (ex) {
      statusCode= SC_INTERNAL_SERVER_ERROR; //Internal Server Error
  
      dtoSedes.apiEstado = ERROR;   
      dtoSedes.apiMensaje = ex.message.toString();
      dtoSedes.data = [];
      dtoSedes.total = 0;
    }
  
    let response = {
      statusCode: statusCode,
      body: JSON.stringify(dtoSedes)
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}

