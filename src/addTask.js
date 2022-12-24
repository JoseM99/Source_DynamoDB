//const { v4 } = require('uuid')
const AWS = require('aws-sdk');

const addTask = async (event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient(); 
    const {id,signedb64,
           sendtype,logob64,
           usuario_sec,
           password_sec,flg,
           password,usuario,
           usuario_send,password_send,
           signedkey} = JSON.parse(event.body); 
    //const id =v4()

    const newTask= {
        id,
        signedb64,
        sendtype,
        logob64,
        usuario_sec,
        password_sec,
        flg, 
        password,
        usuario,
        usuario_send,
        password_send,
        signedkey,
        done: false,
    }
      
    await dynamodb.put({
        TableName: 'cpe_params',
        Item: newTask  
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newTask)
    }

}

module.exports = {
    addTask,
};