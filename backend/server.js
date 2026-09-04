const app = require('./src/app');
const { initDb } = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    await initDb();
  });
}

startServer();
