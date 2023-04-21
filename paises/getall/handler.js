const { sq } = require("./database/config");
const { noExiste, paisPlural, mensaje } = require("./utils/messages");
const { OK, ERROR, SC_INTERNAL_SERVER_ERROR, SC_OK, SC_NOTFOUND } = require("./utils/status");
const DataQueryPaises = require("./entities/dataQuery");
const { queryInputPaises } = require("./validations/queryInputPaises");

exports.getPaises = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`getPaises only accept GET method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    const dtoPaises = new DataQueryPaises();
    let statusCode = SC_INTERNAL_SERVER_ERROR;
  
    try {
  
      const queryParams = event.queryStringParameters;
      const { error, value } = queryInputPaises.validate(queryParams, { abortEarly: false, allowUnknown: true });
  
      if(error === undefined){
        const uspPaisBuscar = "select * from uspPaisBuscar(:intexto,:inordenamiento,:intamanio,:inpagina);";
  
        const [results, metadata] = await sq.query(uspPaisBuscar,
                    {
                      replacements: {
                        intexto: value.nombre, 
                        inordenamiento : value.ordenamiento,
                        intamanio : value.tamanio,
                        inpagina : value.pagina
                      },
                      type : sq.QueryTypes.RAW 
                    });
    
        if(results){
          statusCode = SC_OK; //OK
  
          dtoPaises.apiEstado = OK;
          dtoPaises.apiMensaje = "";
          dtoPaises.data = results;
          dtoPaises.total = results.length;
        }
        else{
          statusCode= SC_NOTFOUND; //Not Found
  
          dtoPaises.apiEstado = ERROR;
          dtoPaises.apiMensaje = mensaje(noExiste,paisPlural);
          dtoPaises.data = [];
          dtoPaises.total = 0;
        }
      }
      else{
        statusCode= SC_NOTFOUND; //Not Found
  
        dtoPaises.apiEstado = ERROR;
        dtoPaises.apiMensaje = error.message.toString();
        dtoPaises.data = [];
        dtoPaises.total = 0;
      }
  
    } catch (ex) {
      statusCode= SC_INTERNAL_SERVER_ERROR; //Internal Server Error
  
      dtoPaises.apiEstado = ERROR;   
      dtoPaises.apiMensaje = ex.message.toString();
      dtoPaises.data = [];
      dtoPaises.total = 0;
    }
  
    let response = {
      statusCode: statusCode,
      body: JSON.stringify(dtoPaises)
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}

