const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Endpoint para listar objetos no S3
app.get('/list', async (req, res) => {
  const params = {
    Bucket: 'us-wk3-user', // Substitua pelo nome do seu bucket
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    res.json(data.Contents); // Retorna a lista de objetos no formato JSON
  } catch (error) {
    console.error('Error listing objects:', error);
    res.status(500).send('Failed to list objects');
  }
});

// Endpoint para buscar conteúdo de um objeto no S3
app.get('/object/:key', async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.json(data.Body.toString('utf-8')); // Retorna o conteúdo do objeto como uma string
  } catch (error) {
    console.error('Failed to fetch object content:', error);
    res.status(500).send('Failed to fetch object content');
  }
});

// Endpoint para upload de arquivo de perfil do usuário
app.post('/uploadProfile', async (req, res) => {
  const { account, userName, userDescription, logo, date1 } = req.body;

  const userProfile = {
    account,
    userName,
    userDescription,
    logo,
    date1: new Date(date1).toISOString() // Converte a data para formato ISO
  };

  const params = {
    Bucket: 'us-wk3-user',
    Key: `users/${account}.json`, // Caminho e nome do arquivo no S3
    Body: JSON.stringify(userProfile),
    ContentType: 'application/json',
  };

  try {
    console.log('Attempting to upload user profile to S3 with params:', params);
    const result = await s3.upload(params).promise();
    console.log('User profile upload successful:', result);
    res.status(200).send('User profile uploaded successfully');
  } catch (error) {
    console.error('Error uploading user profile to S3:', error);
    res.status(500).send(error.message);
  }
});

// Endpoint para obter informações do perfil do usuário com base no account
app.get('/userInfo/:account', async (req, res) => {
  const { account } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: `users/${account}.json`, // Caminho para o arquivo de perfil no S3
  };

  try {
    const data = await s3.getObject(params).promise();
    const userProfile = JSON.parse(data.Body.toString('utf-8'));
    res.json(userProfile);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    res.status(500).send('Failed to fetch user profile');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
