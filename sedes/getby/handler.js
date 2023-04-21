const { sq } = require("./database/config");
const { noExiste, sedeSingular, mensaje } = require("./utils/messages");
const { OK, ERROR, SC_INTERNAL_SERVER_ERROR, SC_OK, SC_NOTFOUND } = require("./utils/status");
const DataQuerySede = require("./entities/dataQuerySede");

exports.getSede = async (event) => {

  if (event.httpMethod !== 'GET') {
    throw new Error(`getSede only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  const dtoSede = new DataQuerySede();
  let statusCode = SC_INTERNAL_SERVER_ERROR;

  try {

    const id = event.pathParameters.id

    const uspSedeInd = "select * from uspSedeInd(:inid);";

    const [results, metadata] = await sq.query(uspSedeInd,
                {
                  replacements: {
                    inid: id 
                  },
                  type: sq.QueryTypes.SELECT 
                });

    if(results){   
      statusCode = SC_OK; //OK

      const uspUbicacionBuscarPorIdSede = "select * from uspUbicacionBuscarPorIdSede(:inid);";

      const ubicaciones = await sq.query(uspUbicacionBuscarPorIdSede,
        {
          replacements: {
            inid: id          
          },
          type: sq.QueryTypes.SELECT
        });

      dtoSede.apiEstado == OK;
      dtoSede.apiMensaje = "";
      dtoSede.id = results.id;
      dtoSede.codigo = results.codigo;
      dtoSede.nombre = results.nombre;       
      dtoSede.idempresa = results.idempresa;
      dtoSede.empresa = results.empresa;
      dtoSede.idestado = results.idestado;
      dtoSede.estado = results.estado;        
      dtoSede.ubicaciones = ubicaciones;
    }
    else{
      statusCode= SC_NOTFOUND; //Not Found

      dtoSede.apiEstado = ERROR;
      dtoSede.apiMensaje = mensaje(noExiste,sedeSingular);
    }

  } catch (ex) {
    statusCode= SC_INTERNAL_SERVER_ERROR; //Internal Server Error

    dtoSede.apiEstado = ERROR;   
    dtoSede.apiMensaje = ex.message.toString();
  }

  let response = {
    statusCode: statusCode,
    body: JSON.stringify(dtoSede)
  }  
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  
  return response;
}
