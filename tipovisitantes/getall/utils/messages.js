const mensaje = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift());

const noExiste = "No existe %s";
const guardar = "Se guardó %s satisfactoriamente";
const eliminar = "Se eliminó %s satisfactoriamente";
const noEliminar = "No se puede eliminar este %s";
const debeSer = "%s deber ser %s.";
const debeIngresar = "Debes Ingresar %s.";
const debeIngresarAlMenosUN = "Debes Ingresar al menos un %s.";
const debeSeleccionar = "Debe Seleccionar %s.";
const debeSeleccionarUN = "Debe Seleccionar un %s.";
const debeSeleccionarUNA = "Debe Seleccionar una %s.";
const debeSeleccionarUNValido = "Debe Seleccionar un %s válido.";
const debeSeleccionarUNAValida = "Debe Seleccionar una %s válida.";
const debeSeleccionarAlmenosUN = "Debe Seleccionar al menos un %s.";
const debeSeleccionarAlmenosUNA = "Debe Seleccionar al menos una %s.";
const debeSeleccionarAlmenosUNValido = "Debe Seleccionar al menos un %s válido.";
const sinPermisoMenu = "No tiene permiso para esta acción";
const atributoNombreDuplicado = "Los nombres de los atributos no deben tener el mismo nombre.";
const atributoInvalido = "Por favor verificar atributos.";
const tipodocumentoNombreDuplicado = "El nombre del tipo de documento ya existe.";
const tipovisitanteNombreDuplicado = "El nombre del tipo de visitante ya existe.";
const tipovisitanteTipoDocumentoDuplicado = "No debe repetir los tipos documentos.";
const credencialesRansa = "Credenciales - RANSA"
const numerico = "numérico";
const entero = "entero";
const cadena = "cadena";
const booleano = "boleano";
const id = "Id";
const nombre = "Nombre";
const apellido = "Apellido";
const correo = "Correo";
const contrasenia = "Contraseña";
const repetircontrasenia = "Repetir Contraseña";
const estado = "Estado";
const ordenamiento = "Ordenamiento";
const pagina = "Ordenamiento";
const tamanio = "Tamaño";
const tipo = "Tipo";
const atributo = "Atributo";
const obligatorio = "Obligatorio";
const vigenciaAtributo = "Vigencia del Atributo";
const usuarioCorreoInvalido = "El formarto de correo de usuario es incorrecto.";
const actualizacontrasenia = "Actualizar Contraseña";
const usuarioCorreoDuplicado = "Este correo de usuario ya existe.";
const contraseniaIgualdad = "Las contraseñas no son iguales.";
const categoria = "Categoría";
const esOcr = "OCR";
const ocrUrl = "Url del OCR";
const esOcrImagenes = "OCR Tipos de Imágenes";
const esOcrImagenUno = "OCR 1 imagen";
const esOcrImagenDos = "OCR 2 imágenes";
const ocrCantidadImagen = "Cantidad de imágenes del OCR";
const esRepositorio = "Repositorio";
const esRepositoriorespuesta = "Espera respuesta";
const repositorioUrl = "Url del Repositorio";
const idAtributo = "Id del Atributo";
const nombreAtributo = "Nombre del Atributo";
const esOcrAtributo = "OCR del Atributo";
const nombreOcrAtributo = "Nombre de OCR del Atributo";
const tipoOcrAtributo = "Tipo de OCR del Atributo";
const formatoOcrAtributo = "Formato de OCR del Atributo";
const cantidadImagenOcrAtributo = "Cantidad de imágenes OCR";
const esRepositorioAtributo = "Repositorio del Atributo";
const nombreRepositorioAtributo = "Nombre de Repositorio del Atributo";
const tipoRepositorioAtributo = "Tipo repositorio";
const paisSingular = "País";
const paisPlural = "Paises";
const empresaSingular = "Empresa";
const empresaPlural = "Empresas";
const sedeSingular = "Sede";
const sedePlural = "Sedes";
const ubicacionSingular = "Ubicación";
const ubicacionPlural = "Ubicaciones";
const organizacionSingular = "Organización";
const organizacionPlural = "Organizaciones";
const tipoDocumentoSingular = "Tipo Documento";
const tipoDocumentoPlural = "Tipo Documentos";
const tipoDocumentoAtributoSingular = "Atributo";
const tipoDocumentoAtributoPlural = "Atributos";
const tipoVisitanteSingular = "Tipo Visitante";
const tipoVisitantePlural = "Tipo Visitantes";
const visitanteSingular = "Visitante";
const visitantePlural = "Visitantes";
const citaSingular = "Cita";
const citaPlural = "Citas";
const tipoPlural = "Tipos";
const formatoPlural = "Formatos";
const logPlural = "Logs";
const idPaisPeru = "45c40600-2a73-4f5e-9e9b-e6cc2805d260";
const idRolPeru = "98567b82-2916-47ea-abd2-b8c79e1752b9";
const buenvenidoRansaCapturas = "Bienvenido al Sistema de Citas - Móludo Capturas";
const buenvenidoRansaAdm = "Bienvenido al Sistema de Citas - Móludo Administracion";

const envioEmailNuevoUsuarioCaptura = `<body>
<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div style="
            
            width: 400px;
            height: auto;
            border: 1px solid gray;
            padding: 20px;
            font-family: Arial, Helvetica, sans-serif;
        ">
            <div style="
                padding: 10px;
                background: #00A744;
                color: white;
                font-size: 20px;
                width: auto;
                
            ">
                Bienvenido a ACD - Web de Captura
            </div>
            <div style="
                width: 100%;
                display: flex;
                flex-direction: row;
            ">
                <div style="
                    width: 60%;
                    padding: 5px;
                    color: #00A744;
                ">
                    <h3>Ahora la gestión de tus operaciones será más simple ágil e inmediata</h3>    
                </div>
                <div style="
                    width: 40%;
                    padding-top: 10px;
                    display: flex;
                    margin: auto;
                    
                ">
                    <div>
                        <img src="https://acd-web-captura.herokuapp.com/assets/img/Logo.png" alt="ransa" >
                    </div>
                    
                </div>
            </div>
            
            <div style="color: rgb(76, 76, 76);">
                Hola <strong>%s</strong> te compartimos tu usuario y contraseña para que vivas la mejor experiencia
                <br/> <br/>
                URL :             <a href= 'https://acd-web-captura.herokuapp.com/auth' target="_blank">https://acd-web-captura.herokuapp.com/auth</a>  <br/>
                Tu Usuario es:    <strong>%s</strong>  <br/>  
                Tu Contraseña es: <strong>%s</strong>  <br/>
             
                 
            </div>
            <div style="
                color: rgb(103, 103, 103); 
                padding-top: 40px;
                "
            >
            <span style="color: rgb(255, 195, 0); font-weight: 700;">¡Recuerda!</span> <br/> 
            1. Esta contraseña es provisional y se podrás cambiar solicitándolo a los administradores del sistema.
            </div>
            <div style="
                    width: 100%;
                    padding: 20px;
                    color: #00A744;
                ">
                    <h4>¡Puedes empezar a disfrutar el módulo de Capturas</h4>    
            </div>
        </div>
    </body>

</html>
`;
const envioEmailEdicionUsuarioCaptura = `
<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div style="
            
            width: 400px;
            height: auto;
            border: 1px solid gray;
            padding: 20px;
            font-family: Arial, Helvetica, sans-serif;
        ">
            <div style="
                padding: 10px;
                background: #00A744;
                color: white;
                font-size: 20px;
                width: auto;
                
            ">
                Bienvenido a ACD - Web de Captura
            </div>
            <div style="
                width: 100%;
                display: flex;
                flex-direction: row;
            ">
                <div style="
                    width: 60%;
                    padding: 5px;
                    color: #00A744;
                ">
                    <h3>Ahora la gestión de tus operaciones será más simple ágil e inmediata</h3>    
                </div>
                <div style="
                    width: 40%;
                    padding-top: 10px;
                    display: flex;
                    margin: auto;
                    
                ">
                    <div>
                        <img src="https://acd-web-captura.herokuapp.com/assets/img/Logo.png" alt="ransa" >
                    </div>
                    
                </div>
            </div>
            
            <div style="color: rgb(76, 76, 76);">
                Hola <strong>%s</strong> Se modificó tu acceso al Portal de Captura
                <br/> <br/>
                URL :             <a href= 'https://acd-web-captura.herokuapp.com/auth' target="_blank">https://acd-web-captura.herokuapp.com/auth</a>  <br/>
                Tu Usuario es:    <strong>%s</strong>  <br/>  
                Tu Contraseña es: <strong>%s</strong>  <br/>
                 
            </div>
            <div style="
                color: rgb(103, 103, 103); 
                padding-top: 40px;
                "
            >
                <span style="color: rgb(255, 195, 0); font-weight: 700;">¡Recuerda!</span> <br/> 
                1. Esta contraseña es provisional y se podrás cambiar solicitándolo a los administradores del sistema.
            </div>
            <div style="
                    width: 100%;
                    padding: 20px;
                    color: #00A744;
                ">
                    <h4>¡Puedes empezar a disfrutar el módulo de Capturas</h4>    
            </div>
        </div>
    </body>

</html>
`;

module.exports = { mensaje, envioEmailNuevoUsuarioCaptura, envioEmailEdicionUsuarioCaptura,
    noExiste,
    guardar,
    eliminar,
    noEliminar,
    debeSer,
    debeIngresar,
    debeIngresarAlMenosUN,
    debeSeleccionar,
    debeSeleccionarUN,
    debeSeleccionarUNA,
    debeSeleccionarUNValido,
    debeSeleccionarUNAValida,
    debeSeleccionarAlmenosUN,
    debeSeleccionarAlmenosUNA,
    debeSeleccionarAlmenosUNValido,
    sinPermisoMenu,
    atributoNombreDuplicado,
    atributoInvalido,
    tipodocumentoNombreDuplicado,
    tipovisitanteNombreDuplicado,
    tipovisitanteTipoDocumentoDuplicado,
    credencialesRansa,
    numerico,
    entero,
    cadena,
    booleano,
    id,
    nombre,
    apellido,
    correo,
    contrasenia,
    repetircontrasenia,
    estado,
    ordenamiento,
    pagina,
    tamanio,
    tipo,
    atributo,
    obligatorio,
    vigenciaAtributo,
    usuarioCorreoInvalido,
    actualizacontrasenia,
    usuarioCorreoDuplicado,
    contraseniaIgualdad,
    categoria,
    esOcr,
    ocrUrl,
    esOcrImagenes,
    esOcrImagenUno,
    esOcrImagenDos,
    ocrCantidadImagen,
    esRepositorio,
    esRepositoriorespuesta,
    repositorioUrl,
    idAtributo,
    nombreAtributo,
    esOcrAtributo,
    nombreOcrAtributo,
    tipoOcrAtributo,
    formatoOcrAtributo,
    cantidadImagenOcrAtributo,
    esRepositorioAtributo,
    nombreRepositorioAtributo,
    tipoRepositorioAtributo,
    paisSingular,
    paisPlural,
    empresaSingular,
    empresaPlural,
    sedeSingular,
    sedePlural,
    ubicacionSingular,
    ubicacionPlural,
    organizacionSingular,
    organizacionPlural,
    tipoDocumentoSingular,
    tipoDocumentoPlural,
    tipoDocumentoAtributoSingular,
    tipoDocumentoAtributoPlural,
    tipoVisitanteSingular,
    tipoVisitantePlural,
    visitanteSingular,
    visitantePlural,
    citaSingular,
    citaPlural,
    tipoPlural,
    formatoPlural,
    logPlural,
    idPaisPeru,
    idRolPeru,
    buenvenidoRansaCapturas,
    buenvenidoRansaAdm
};