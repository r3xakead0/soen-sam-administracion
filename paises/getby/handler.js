const { sq } = require("./database/config");
const { noExiste, paisSingular, mensaje } = require("./utils/messages");
const { OK, ERROR, SC_INTERNAL_SERVER_ERROR, SC_OK, SC_NOTFOUND } = require("./utils/status");
const DataQueryPais = require("./entities/dataQueryPais");

exports.getPais = async (event) => {

  if (event.httpMethod !== 'GET') {
    throw new Error(`getPais only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  const dtoPais = new DataQueryPais();
  let statusCode = SC_INTERNAL_SERVER_ERROR;

  try {

    const id = event.pathParameters.id

    const uspPaisInd = "select * from uspPaisInd(:inid);"

    const [results, metadata] = await sq.query(uspPaisInd,
                {
                  replacements: {
                    inid: id 
                  },
                  type: sq.QueryTypes.SELECT 
                });

    if(results){   
      statusCode = SC_OK; //OK

      dtoPais.apiEstado == OK;
      dtoPais.apiMensaje = "";
      dtoPais.id = results.id;
      dtoPais.codigo = results.codigo;
      dtoPais.nombre = results.nombre;
      dtoPais.idestado = results.idestado;
      dtoPais.estado = results.estado;
    }
    else{
      statusCode= SC_NOTFOUND; //Not Found

      dtoPais.apiEstado = ERROR;
      dtoPais.apiMensaje = mensaje(noExiste,paisSingular);
    }

  } catch (ex) {
    statusCode= SC_INTERNAL_SERVER_ERROR; //Internal Server Error

    dtoPais.apiEstado = ERROR;   
    dtoPais.apiMensaje = ex.message.toString();
  }

  let response = {
    statusCode: statusCode,
    body: JSON.stringify(dtoPais)
  }  
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  
  return response;
}
