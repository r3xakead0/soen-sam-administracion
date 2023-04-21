const { Sequelize } = require("sequelize");
const { SecretsManager } = require("@aws-sdk/client-secrets-manager");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: 'postgres'  
});

sequelize.beforeConnect(async (config) => {  
  var client = new SecretsManager({
    credentials: {
      accessKeyId : process.env.AWS_SECRET_KEY_DB,
      secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY_DB,
    },
    region : process.env.AWS_REGION_DB,
  });

  let data = await client.getSecretValue({SecretId: process.env.AWS_SECRET_DB});

  if ('SecretString' in data) {    
    let secret = JSON.parse(data.SecretString);
    config.database = process.env.AWS_DB_NAME;
    config.host = secret.host;
    config.username = secret.username;
    config.password = secret.password;  
  }
});

module.exports = { sq: sequelize };