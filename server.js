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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


