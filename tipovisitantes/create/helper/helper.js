const { Op } = require("sequelize");
require("dotenv").config();
const crypto = require("crypto");
const argon2 = require("argon2");
const { Nomenclatura } = require("../models/nomenclatura.js");
const { CatalogoEstado } = require("../models/catalogoestado.js");
const { CheckStatus } = require("../core/checkStatus.js");
const { ERROR } = require("../core/status.js");
const nodemailer = require("nodemailer");


const configurarArrayErrores=(details)=>{
  const mensajes=[];
  
  details.forEach(detail => {    
    if(mensajes.filter(mensaje => mensaje.id === detail.path[0]).length===0){
      mensajes.push({id:detail.path[0], texto: detail.message});
    }else{
      mensajes.forEach(mensaje => {
          if(mensaje.id === detail.path[0]){
              mensaje.texto += " "+detail.message;
          }
      });
    }
  });

  return mensajes;
}

const agregarMensajeError=(mensajes,obj)=>{
   
  if(mensajes.filter(mensaje => mensaje.id === obj.id).length===0){
    mensajes.push({id:obj.id, texto: obj.texto});
  }else{
    mensajes.forEach(mensaje => {
        if(mensaje.id === obj.id){
            mensaje.texto += " "+obj.texto;
        }
    });
  }
  return mensajes;
}

const mostrarMensajeError=(mensajes)=>{
    let mensaje='';
    if(mensajes!==undefined && mensajes.length>0){      
      mensajes.forEach(item=>{
        mensaje+= item.texto+' ';
      });    
    }    
    return mensaje;
}

const fechaActual=()=>{  
  let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "America/Lima" });
  return new Date(nz_date_string);  
}

const generarCodigo = async (entidad)=>{
  let codigo='';
  let nomenclatura=await Nomenclatura.findOne({
      where: {
        entidad: {
          [Op.iLike]: entidad
        }
      }
  });

  if(nomenclatura!==null){
    nomenclatura.contador++;
    codigo="0000000000"+nomenclatura.contador;
    codigo=nomenclatura.abreviatura+codigo.substring(codigo.length - nomenclatura.longitud);

    await nomenclatura.save();   
  }

  return codigo;
}

const validarCatalogoCodigo = async (codigo,valor)=>{
  let existe =false;
  let nomenclatura = await CatalogoEstado.findOne({
    where: {
      codigo:codigo,
      valor:valor
    }
  });

  if(nomenclatura !== null){
    existe=true;
  } 
  return existe;
}

const encryptarContrasenia = async (password)=> {
  const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of itetations
  }
  let salt = crypto.randomBytes(16);  
  return await argon2.hash(password, {
      ...hashingConfig,
      salt,
  })
}

async function enviarEmail(obj,callback){
  try{
    // create reusable transporter object using the default SMTP transport
    let transporter;
    
    if(process.env.SMTP_TYPE ==='GOOGLE'){

      transporter= nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASS
        },
      });

    }else{
      transporter= nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASS
        },
      });
    }
    
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM, // sender address
      to: obj.correo, // list of receivers
      subject: obj.titulo, // Subject line
      text: obj.mensaje, // plain text body 
      html: obj.html   
    });
   
    // console.log("Message sent: %s *************", info.accepted);
    CheckStatus.apiEstado = OK;

  }catch(error){
    checkStatus.apiMensaje = error.message;
    checkStatus.apiEstado=ERROR;
    callback(CheckStatus);
  }

}

module.exports = { configurarArrayErrores, agregarMensajeError, mostrarMensajeError, 
  fechaActual, generarCodigo, validarCatalogoCodigo, encryptarContrasenia, enviarEmail };