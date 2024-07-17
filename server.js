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

// Endpoint para upload de arquivo (mantido como estava)
app.post('/upload', async (req, res) => {
  const { title, description, price, account } = req.body;

  const params = {
    Bucket: 'us-wk3-user',
    Key: `jobs/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${Date.now()}.json`, // Caminho e nome do arquivo no S3
    Body: JSON.stringify({ title, description, price, account }),
    ContentType: 'application/json',
  };

  try {
    console.log('Attempting to upload to S3 with params:', params);
    const result = await s3.upload(params).promise();
    console.log('Upload successful:', result);
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).send(error.message);
  }
});

// Novo endpoint para upload de perfil do usuário
app.post('/uploadProfile', async (req, res) => {
  const { userName, userDescription, logo, date1, account } = req.body;

  const params = {
    Bucket: 'us-wk3-user',
    Key: `users/${userName}.json`, // Caminho e nome do arquivo no S3
    Body: JSON.stringify({ userName, userDescription, logo, date1, account }),
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



