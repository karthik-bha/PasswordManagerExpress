const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'PwdMgr';
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Enable CORS for all origins (you can restrict later)
dotenv.config();
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to DB
client.connect()
  .then(() => console.log("Successfully connected to the database"))
  .catch((error) => console.error("Error connecting to the database:", error));

// GET Route to fetch all documents
app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findRes = await collection.find({}).toArray();
    res.json(findRes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
});

// POST Route to save a new password
app.post('/', async (req, res) => {
  try {
    const { URL, username, pass } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    // Insert the received data into the database
    const insertRes = await collection.insertOne({ URL, username, pass });
    res.json({ success: true, message: 'Password saved successfully', insertedId: insertRes.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save password' });
  }
});


// DELETE Route to delete a password entry
app.delete('/', async (req, res) => {
  try {
    const { URL, username, pass } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    // Delete the entry
    const deleteRes = await collection.deleteOne({ URL, username, pass });

    if (deleteRes.deletedCount === 0) {
      return res.status(404).json({ error: 'Password entry not found' });
    }

    res.json({ success: true, message: 'Password deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
