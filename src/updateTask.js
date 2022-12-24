const uuid = require("uuid");
const AWS = require("aws-sdk");

const updateTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { done , 
        signedb64 ,  
        sendtype , 
        logob64,
        usuario_sec,
        password_sec,
        usuario_send,
        password_send,
        flg, 
        password,
        usuario,
        signedkey} = JSON.parse(event.body);

  await dynamodb
    .update({
      TableName: "cpe_params",
      Key: { id },
      UpdateExpression: 
      "set done = :done , signedb64 = :signedb64, usuario_send = :usuario_send ,password_send = :password_send ,sendtype = :sendtype , logob64 = :logob64 ,usuario_sec = :usuario_sec,password_sec = :password_sec,flg = :flg , password = :password , usuario = :usuario, signedkey = :signedkey",  
      ExpressionAttributeValues: {
        ":done": done || null,
        ":signedb64": signedb64,
        ":sendtype": sendtype,
        ":logob64": logob64,
        ":usuario_sec":usuario_sec,
        ":password_sec":password_sec,
        ":flg": flg , 
        ":password": password,
        ":usuario": usuario,
        ":usuario_send": usuario_send,
        ":password_send": password_send,
        ":signedkey": signedkey
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Datos Actualizados Correctamente",
    }),
  };
};

module.exports = {
  updateTask,
};