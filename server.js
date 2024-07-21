const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const sharp = require('sharp');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração do CORS
app.use(cors({
  origin: '*', // Permite todas as origens. Ajuste conforme necessário para produção.
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

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
    res.setHeader('Content-Type', 'application/json'); // Define o Content-Type como JSON
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
    // Define o Content-Type com base na extensão do arquivo
    const ext = key.split('.').pop();
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    res.setHeader('Content-Type', contentType);
    res.send(data.Body); // Envia o buffer diretamente
  } catch (error) {
    console.error('Failed to fetch object content:', error);
    res.status(500).send('Failed to fetch object content');
  }
});

// Endpoint para upload de perfil com imagem no JSON
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

  // Converte a imagem base64 para buffer usando sharp
  const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    const processedImage = await sharp(buffer)
      .resize({ width: 200, height: 200 })
      .png() // Alterado para PNG
      .toBuffer();

    // Converte o buffer de volta para base64
    const base64Image = `data:image/png;base64,${processedImage.toString('base64')}`;

    // Atualiza o perfil do usuário com a imagem codificada em base64
    const userProfile = {
      account,
      userName,
      userDescription,
      profileImage: base64Image, // Imagem codificada em base64
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
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
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
    res.setHeader('Content-Type', 'application/json'); // Define o Content-Type como JSON
    res.json(userProfile);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    res.status(500).send('Failed to fetch user profile');
  }
});

// Endpoint para upload de informações DAO com imagem no JSON
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

  // Converte a imagem base64 para buffer usando sharp
  const base64Data = daoLogo.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    const processedImage = await sharp(buffer)
      .resize({ width: 200, height: 200 })
      .png() // Alterado para PNG
      .toBuffer();

    // Converte o buffer de volta para base64
    const base64Image = `data:image/png;base64,${processedImage.toString('base64')}`;

    // Atualiza as informações DAO com a imagem codificada em base64
    const daoProfile = {
      daoName,
      daoDescription,
      logo: base64Image, // Imagem codificada em base64
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
  } catch (error) {
    console.error('Error processing DAO image:', error);
    res.status(500).send('Error processing DAO image');
  }
});

// Endpoint para obter informações DAO
app.get('/getDaoInfo/:daoName', async (req, res) => {
  const { daoName } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: `Dao/${daoName}.json`,
  };

  try {
    const data = await s3.getObject(params).promise();
    const daoProfile = JSON.parse(data.Body.toString('utf-8'));
    res.setHeader('Content-Type', 'application/json'); // Define o Content-Type como JSON
    res.json(daoProfile);
  } catch (error) {
    console.error('Failed to fetch DAO profile:', error);
    res.status(500).send('Failed to fetch DAO profile');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
