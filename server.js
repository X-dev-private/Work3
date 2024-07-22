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

// Endpoint para listar objetos na pasta 'jobs'
app.get('/jobs', async (req, res) => {
  const params = {
    Bucket: 'us-wk3-user',
    Prefix: 'jobs/', // Lista todos os arquivos na pasta 'jobs'
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const jobs = await Promise.all(
      data.Contents.map(async (item) => {
        const objectData = await s3.getObject({ Bucket: params.Bucket, Key: item.Key }).promise();
        return JSON.parse(objectData.Body.toString('utf-8'));
      })
    );
    res.setHeader('Content-Type', 'application/json');
    res.json(jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    res.status(500).send('Failed to fetch jobs');
  }
});

// Endpoint para obter um objeto específico
app.get('/object/:key', async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: 'us-wk3-user',
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    const ext = key.split('.').pop();
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    res.setHeader('Content-Type', contentType);
    res.send(data.Body);
  } catch (error) {
    console.error('Failed to fetch object content:', error);
    res.status(500).send('Failed to fetch object content');
  }
});

// Endpoint para upload de dados de trabalho
app.post('/upload', async (req, res) => {
  const { title, description, price, date, maybeAssigned, assigned, completed, creator } = req.body;

  console.log('Received job data:', { title, description, price, date, maybeAssigned, assigned, completed, creator });

  let dateIso;
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj)) {
      throw new Error('Invalid date format');
    }
    dateIso = dateObj.toISOString();
  } catch (error) {
    console.error('Invalid date format:', date);
    return res.status(400).send('Invalid date format');
  }

  // Cria o objeto de dados de trabalho
  const jobData = {
    title,
    description,
    price,
    date: dateIso,
    maybeAssigned, // Novo campo
    assigned,     // Novo campo
    completed,    // Novo campo
    creator       // Novo campo
  };

  // Armazena os dados de trabalho no S3 diretamente na pasta 'jobs'
  const jobParams = {
    Bucket: 'us-wk3-user',
    Key: `jobs/${title}.json`, // Armazena diretamente na pasta 'jobs'
    Body: JSON.stringify(jobData),
    ContentType: 'application/json',
  };

  try {
    console.log('Attempting to upload job data to S3 with params:', jobParams);
    const result = await s3.upload(jobParams).promise();
    console.log('Job data upload successful:', result);
    res.status(200).send('Job data uploaded successfully');
  } catch (error) {
    console.error('Error uploading job data to S3:', error);
    res.status(500).send('Failed to upload job data');
  }
});

// Endpoint para atualizar o campo maybeAssigned de um trabalho
app.post('/updateMaybeAssigned/:title', async (req, res) => {
  const { title } = req.params;
  const { maybeAssigned } = req.body;

  if (!Array.isArray(maybeAssigned)) {
    return res.status(400).send('Invalid maybeAssigned format');
  }

  const params = {
    Bucket: 'us-wk3-user',
    Key: `jobs/${title}.json`, // A chave do trabalho no S3
  };

  try {
    // Obtém os dados atuais do trabalho
    const data = await s3.getObject(params).promise();
    const jobData = JSON.parse(data.Body.toString('utf-8'));

    // Atualiza o campo maybeAssigned
    jobData.maybeAssigned = maybeAssigned;

    // Salva os dados atualizados no S3
    const uploadParams = {
      Bucket: 'us-wk3-user',
      Key: params.Key,
      Body: JSON.stringify(jobData),
      ContentType: 'application/json',
    };

    await s3.upload(uploadParams).promise();
    res.status(200).send('Job updated successfully');
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).send('Failed to update job');
  }
});

// Endpoint para upload de perfil com imagem no JSON
app.post('/uploadProfile', async (req, res) => {
  const { account, userName, userDescription, profileImage, date1 } = req.body;

  console.log('Received profile data:', { account, userName, userDescription, profileImage, date1 });

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

  const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    const processedImage = await sharp(buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();

    const base64Image = `data:image/png;base64,${processedImage.toString('base64')}`;

    const userProfile = {
      account,
      userName,
      userDescription,
      profileImage: base64Image,
      date1: date1Iso
    };

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
    res.setHeader('Content-Type', 'application/json');
    res.json(userProfile);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    res.status(500).send('Failed to fetch user profile');
  }
});

// Endpoint para upload de informações DAO com imagem no JSON
app.post('/uploadDao', async (req, res) => {
  const { daoName, daoDescription, daoLogo, date1, accountManager, accountUser } = req.body;

  console.log('Received DAO info:', { daoName, daoDescription, daoLogo, date1, accountManager, accountUser });

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

  const base64Data = daoLogo.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    const processedImage = await sharp(buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();

    const base64Image = `data:image/png;base64,${processedImage.toString('base64')}`;

    const daoProfile = {
      daoName,
      daoDescription,
      logo: base64Image,
      date1: date1Iso,
      accountManager,
      accountUser
    };

    const daoParams = {
      Bucket: 'us-wk3-user',
      Key: `Dao/${daoName}.json`,
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
    res.setHeader('Content-Type', 'application/json');
    res.json(daoProfile);
  } catch (error) {
    console.error('Failed to fetch DAO profile:', error);
    res.status(500).send('Failed to fetch DAO profile');
  }
});

// Novo endpoint para obter informações de todos os DAOs
app.get('/getAllDaoInfo', async (req, res) => {
  const params = {
    Bucket: 'us-wk3-user',
    Prefix: 'Dao/',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const daoProfiles = await Promise.all(
      data.Contents.map(async (item) => {
        const objectData = await s3.getObject({ Bucket: params.Bucket, Key: item.Key }).promise();
        return JSON.parse(objectData.Body.toString('utf-8'));
      })
    );
    res.setHeader('Content-Type', 'application/json');
    res.json(daoProfiles);
  } catch (error) {
    console.error('Failed to fetch all DAO profiles:', error);
    res.status(500).send('Failed to fetch all DAO profiles');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
