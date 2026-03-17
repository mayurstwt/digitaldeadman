import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const mongoDbName = process.env.MONGODB_DB_NAME || "digitaldeadman";

type GlobalMongoCache = typeof globalThis & {
  __digitalDeadmanMongoClientPromise?: Promise<MongoClient>;
};

const globalCache = globalThis as GlobalMongoCache;

function createClientPromise() {
  const client = new MongoClient(mongoUri);
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
