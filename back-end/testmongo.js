const mongoose = require('mongoose');

// Load env vars if needed
require('dotenv').config();

async function main() {
  const uri = process.env.MONGO_URI; // use real URI here
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  const kittySchema = new mongoose.Schema({
    name: String
  });

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  await silence.save();
  console.log("🐱 Saved kitten to DB");

  // Disconnect after saving (optional in long-running apps)
  await mongoose.disconnect();
  console.log("👋 Disconnected from DB");
}

main().catch(err => console.error("❌ Error:", err));
