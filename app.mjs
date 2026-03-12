import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Thử đọc cả hai tên biến để đảm bảo không bị undefined
const uri = process.env.MONGO_URI || process.env.MONGODB_URI; 
const PORT = process.env.PORT || 3000;

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

const yourNameAndEmoji = { name: 'Nhu', emoji: '🌟' }; 

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Endpoint điểm danh
app.get('/api/init-emoji', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('exam');
    await collection.updateOne(
        { name: yourNameAndEmoji.name }, 
        { $set: yourNameAndEmoji }, 
        { upsert: true }
    );
    res.json({ message: 'name & emoji recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint cho Frontend tìm kiếm
app.post('/api/get-name', async (req, res) => {
  try {
    const { userName } = req.body;
    const db = client.db('cis486');
    const collection = db.collection('exam');
    const result = await collection.findOne({ name: userName });
    if (!result) return res.status(404).json({ error: 'Name not found' });
    res.json({ name: result.name, emoji: result.emoji });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});