import crypto from "node:crypto";
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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
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
  const db = await getMongoDb();
  const collection = db.collection<UserDocument>(collectionName);

  await collection.createIndexes([{ key: { email: 1 }, unique: true }]);

  return collection;
}

export async function createUser(input: CreateUserInput) {
  const collection = await getUsersCollection();
  const now = new Date().toISOString();
  const passwordSalt = crypto.randomBytes(12).toString("hex");

  const user: UserDocument = {
    _id: crypto.randomUUID(),
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    role: "freelancer",
    passwordSalt,
    passwordHash: hashPassword(input.password, passwordSalt),
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

  const attemptedHash = hashPassword(password, user.passwordSalt);
  const matches = crypto.timingSafeEqual(
    Buffer.from(attemptedHash, "hex"),
    Buffer.from(user.passwordHash, "hex"),
  );

  return matches ? toUserRecord(user) : null;
}
