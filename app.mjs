

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Thử đọc cả hai tên biến để đảm bảo không bị undefined
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

const yourNameAndEmoji = { name: 'Nhu', emoji: '🌟' };