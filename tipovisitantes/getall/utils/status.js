const OK = 'Ok';
const ERROR = 'Error';
const CREAR = 'Crear';
const EDITAR = 'Editar';
const ELIMINAR = 'Eliminar';

const SC_OK = 200;
const SC_CREATED = 201;
const SC_NOTFOUND = 404;
const SC_UNPROCESSABLE_CONTENT = 422;
const SC_INTERNAL_SERVER_ERROR = 500;
const SC_UNAUTHORIZED = 401;

module.exports = {
    OK, ERROR, CREAR, EDITAR, ELIMINAR,
    SC_OK,
    SC_CREATED, 
    SC_NOTFOUND,
    SC_UNPROCESSABLE_CONTENT,
    SC_INTERNAL_SERVER_ERROR,
    SC_UNAUTHORIZED
}