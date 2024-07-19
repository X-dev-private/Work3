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

  const userProfile = {
    account,
    userName,
    userDescription,
    logo,
    date1: new Date(date1).toISOString()
  };

  const params = {
    Bucket: 'us-wk3-user',
    Key: `users/${account}.json`,
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
