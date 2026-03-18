import { MongoClient } from "mongodb";

const rawUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
// Clean the URI: remove whitespace and literal quotes that might come from .env
const mongoUri = rawUri.trim().replace(/^["']|["']$/g, "");
const mongoDbName = process.env.MONGODB_DB_NAME || "digitaldeadman";

type GlobalMongoCache = typeof globalThis & {
  __digitalDeadmanMongoClientPromise?: Promise<MongoClient>;
};

const globalCache = globalThis as GlobalMongoCache;

function createClientPromise() {
  const client = new MongoClient(mongoUri, {
    connectTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000,  // 45 seconds
    serverSelectionTimeoutMS: 10000,
  });
  return client.connect();
}

export function getMongoClient() {
  if (!globalCache.__digitalDeadmanMongoClientPromise) {
    globalCache.__digitalDeadmanMongoClientPromise = createClientPromise();
  }

  return globalCache.__digitalDeadmanMongoClientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(mongoDbName);
}
