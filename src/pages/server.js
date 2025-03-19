const express = require('express');
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

// AWS Configuration
AWS.config.update({
  region: 'ap-southeast-2', // Update with your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';

app.use(express.json());
app.use(cors());

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  
  try {
    // Check if user already exists
    const checkParams = {
      TableName: TABLE_NAME,
      Key: { username }
    };
    
    const existingUser = await dynamodb.get(checkParams).promise();
    if (existingUser.Item) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user to DynamoDB
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      }
    };
    
    await dynamodb.put(params).promise();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { username }
    };
    
    const user = await dynamodb.get(params).promise();
    
    if (!user.Item) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.Item.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ message: 'Login successful', username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});