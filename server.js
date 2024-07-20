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

// Endpoint existente para listar objetos
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

// Endpoint existente para obter um objeto
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

// Endpoint existente para upload de perfil
app.post('/uploadProfile', async (req, res) => {
  const { account, userName, userDescription, profileImage, date1 } = req.body;

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
  const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  // Define o nome do arquivo da imagem
  const imageKey = `profileImages/${account}.jpg`; // Ajuste o caminho conforme necessário

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
    profileImage: imageUrl, // Atualiza com a URL da imagem
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

// Endpoint para obter informações de um usuário
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

// Novo endpoint para upload de informações DAO
app.post('/uploadDao', async (req, res) => {
  const { daoName, daoDescription, daoLogo, date1, accountModerator, accountUser } = req.body;

  console.log('Received DAO info:', { daoName, daoDescription, daoLogo, date1, accountModerator, accountUser }); // Log para ver as informações recebidas

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
  const base64Data = daoLogo.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  // Define o nome do arquivo da imagem
  const imageKey = `daoImages/${daoName}.jpg`; // Ajuste o caminho conforme necessário

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
    console.log('DAO image upload successful');
  } catch (error) {
    console.error('Error uploading DAO image to S3:', error);
    return res.status(500).send('Error uploading DAO image');
  }

  // Define a URL da imagem armazenada no S3
  const imageUrl = `https://us-wk3-user.s3.amazonaws.com/${imageKey}`;

  // Atualiza as informações DAO com a URL da imagem
  const daoProfile = {
    daoName,
    daoDescription,
    logo: imageUrl,
    date1: date1Iso,
    accountModerator,
    accountUser
  };

  // Armazena as informações DAO no S3
  const daoParams = {
    Bucket: 'us-wk3-user',
    Key: `Dao/${daoName}.json`, // Usa daoName para o nome do arquivo
    Body: JSON.stringify(daoProfile),
    ContentType: 'application/json',
  };

  try {
    console.log('Attempting to upload DAO profile to S3 with params:', daoParams);
    const result = await s3.upload(daoParams).promise();
    console.log('DAO profile upload successful:', result);
    res.status(200).send('DAO profile uploaded successfully');
  } catch (error) {
    console.error('Error uploading DAO profile to S3:', error);
    res.status(500).send(error.message);
  }
});

// Novo endpoint para obter informações DAO
app.get('/getDaoInfo/:daoName', async (req, res) => {
  const { daoName } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: `Dao/${daoName}.json`,
  };

  try {
    const data = await s3.getObject(params).promise();
    const daoProfile = JSON.parse(data.Body.toString('utf-8'));
    res.json(daoProfile);
  } catch (error) {
    console.error('Failed to fetch DAO profile:', error);
    res.status(500).send('Failed to fetch DAO profile');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
