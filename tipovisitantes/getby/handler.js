const { sq } = require("./database/config");
const { noExiste, getTipoVisitante , mensaje } = require("./utils/messages");
const { OK, ERROR, SC_INTERNAL_SERVER_ERROR, SC_OK, SC_NOTFOUND } = require("./utils/status");
const DataQueryTipoVisitante = require("./entities/dataQueryTipoVisitante");

exports.getTipoVisitante = async (event) => {

  if (event.httpMethod !== 'GET') {
    throw new Error(`getTipoVisitante only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  const dtoTipoVisitante = new DataQueryTipoVisitante();
  let statusCode = SC_INTERNAL_SERVER_ERROR;

  try {

    const id = event.pathParameters.id

    const uspTipoVisitanteInd = "select * from uspTipoVisitanteInd(:inid);";

    const [results, metadata] = await sq.query(uspTipoVisitanteInd,
                {
                  replacements: {
                    inid: id 
                  },
                  type: sq.QueryTypes.SELECT 
                });

    if(results){   
      statusCode = SC_OK; //OK

      dtoTipoVisitante.apiEstado == OK;
      dtoTipoVisitante.apiMensaje = "";
      dtoTipoVisitante.id = results.id;
      dtoTipoVisitante.codigo = results.codigo;
      dtoTipoVisitante.nombre = results.nombre;
      dtoTipoVisitante.idestado = results.idestado;
      dtoTipoVisitante.estado = results.estado;
      dtoTipoVisitante.idtipo = results.idtipo;
      dtoTipoVisitante.tipo = results.tipo;
      dtoTipoVisitante.idrepositorio = results.idrepositorio;
      dtoTipoVisitante.tipodocumentos = tipodocumentos;
    }
    else{
      statusCode= SC_NOTFOUND; //Not Found

      dtoTipoVisitante.apiEstado = ERROR;
      dtoTipoVisitante.apiMensaje = mensaje(noExiste,getTipoVisitante );
    }

  } catch (ex) {
    statusCode= SC_INTERNAL_SERVER_ERROR; //Internal Server Error

    dtoTipoVisitante.apiEstado = ERROR;   
    dtoTipoVisitante.apiMensaje = ex.message.toString();
  }

  let response = {
    statusCode: statusCode,
    body: JSON.stringify(dtoTipoVisitante)
  }  
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  
  return response;
}
