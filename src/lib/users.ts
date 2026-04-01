import crypto from "node:crypto";
import { promisify } from "node:util";
import { getMongoDb } from "@/lib/mongodb";

export type UserRole = "freelancer";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type UserDocument = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordSalt: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

const collectionName = "users";
const scryptAsync = promisify(crypto.scrypt);

type GlobalUserCache = typeof globalThis & {
  __digitalDeadmanUsersCollectionPromise?: Promise<import("mongodb").Collection<UserDocument>>;
};

const globalUserCache = globalThis as GlobalUserCache;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function hashPassword(password: string, salt: string) {
  const derivedKey = await scryptAsync(password, salt, 64);
  return Buffer.from(derivedKey as ArrayBuffer).toString("hex");
}

function toUserRecord(document: UserDocument): UserRecord {
  return {
    id: document._id,
    name: document.name,
    email: document.email,
    role: document.role,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

async function getUsersCollection() {
  if (!globalUserCache.__digitalDeadmanUsersCollectionPromise) {
    globalUserCache.__digitalDeadmanUsersCollectionPromise = (async () => {
      const db = await getMongoDb();
      const collection = db.collection<UserDocument>(collectionName);

      await collection.createIndexes([{ key: { email: 1 }, unique: true }]);

      return collection;
    })();
  }

  return globalUserCache.__digitalDeadmanUsersCollectionPromise;
}

export async function createUser(input: CreateUserInput) {
  const collection = await getUsersCollection();
  const now = new Date().toISOString();
  const passwordSalt = crypto.randomBytes(12).toString("hex");
  const passwordHash = await hashPassword(input.password, passwordSalt);

  const user: UserDocument = {
    _id: crypto.randomUUID(),
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    role: "freelancer",
    passwordSalt,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(user);
  return toUserRecord(user);
}

export async function getUserById(id: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ _id: id });
  return user ? toUserRecord(user) : null;
}

export async function getUserByEmail(email: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ email: normalizeEmail(email) });
  return user ? toUserRecord(user) : null;
}

export async function verifyUserCredentials(email: string, password: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ email: normalizeEmail(email) });

  if (!user) {
    return null;
  }

  const attemptedHash = await hashPassword(password, user.passwordSalt);
  const matches = crypto.timingSafeEqual(
    Buffer.from(attemptedHash, "hex"),
    Buffer.from(user.passwordHash, "hex"),
  );

  return matches ? toUserRecord(user) : null;
}
