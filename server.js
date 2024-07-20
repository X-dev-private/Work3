const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config();

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

app.get('/list', async (req, res) => {
  const params = {
    Bucket: 'us-wk3-user', 
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    res.json(data.Contents); 
  } catch (error) {
    console.error('Error listing objects:', error);
    res.status(500).send('Failed to list objects');
  }
});

app.get('/object/:key', async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.json(data.Body.toString('utf-8'));
  } catch (error) {
    console.error('Failed to fetch object content:', error);
    res.status(500).send('Failed to fetch object content');
  }
});

app.post('/uploadProfile', async (req, res) => {
  const { account, userName, userDescription, logo, date1 } = req.body;

  console.log('Received date1:', date1); // Log para ver o valor de date1

  let date1Iso;
  try {
    const dateObj = new Date(date1);
    if (isNaN(dateObj)) {
      throw new Error('Invalid date format');
    }
    date1Iso = dateObj.toISOString();
  } catch (error) {
    console.error('Invalid date format:', date1);
    return res.status(400).send('Invalid date format');
  }

  // Converte a imagem base64 para buffer
  const base64Data = logo.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  // Define o nome do arquivo da imagem
  const imageKey = `images/${account}.jpg`; // Ajuste o caminho conforme necessário

  // Armazena a imagem no S3
  const imageParams = {
    Bucket: 'us-wk3-user',
    Key: imageKey,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg' // Ajuste o tipo conforme necessário
  };

  try {
    await s3.upload(imageParams).promise();
    console.log('Image upload successful');
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    return res.status(500).send('Error uploading image');
  }

  // Define a URL da imagem armazenada no S3
  const imageUrl = `https://us-wk3-user.s3.amazonaws.com/${imageKey}`;

  // Atualiza o perfil do usuário com a URL da imagem
  const userProfile = {
    account,
    userName,
    userDescription,
    logo: imageUrl, // Atualiza com a URL da imagem
    date1: date1Iso
  };

  // Armazena o perfil do usuário no S3
  const profileParams = {
    Bucket: 'us-wk3-user',
    Key: `users/${account}.json`,
    Body: JSON.stringify(userProfile),
    ContentType: 'application/json',
  };

  try {
    console.log('Attempting to upload user profile to S3 with params:', profileParams);
    const result = await s3.upload(profileParams).promise();
    console.log('User profile upload successful:', result);
    res.status(200).send('User profile uploaded successfully');
  } catch (error) {
    console.error('Error uploading user profile to S3:', error);
    res.status(500).send(error.message);
  }
});

app.get('/userInfo/:account', async (req, res) => {
  const { account } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: `users/${account}.json`,
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
