import crypto from "node:crypto";
import { getMongoDb } from "@/lib/mongodb";
import type { Collection } from "mongodb";

export type ProjectStatus = "pending" | "paid";

export type ProjectRecord = {
  id: string;
  ownerUserId: string;
  manageToken: string;
  publicToken: string;
  projectName: string;
  clientName: string;
  contactEmail: string;
  invoiceUrl: string;
  customMessage: string;
  allowedDomains: string[];
  status: ProjectStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectInput = {
  ownerUserId: string;
  projectName: string;
  clientName: string;
  contactEmail: string;
  invoiceUrl: string;
  customMessage: string;
  allowedDomains: string[];
};

export type UpdateProjectInput = {
  projectName: string;
  clientName: string;
  contactEmail: string;
  invoiceUrl: string;
  customMessage: string;
  allowedDomains: string[];
};

type ProjectDocument = Omit<ProjectRecord, "id"> & {
  _id: string;
};

const collectionName = "projects";

type GlobalProjectsCache = typeof globalThis & {
  __digitalDeadmanProjectsCollectionPromise?: Promise<Collection<ProjectDocument>>;
};

const globalProjectsCache = globalThis as GlobalProjectsCache;

function createToken(length = 24) {
  return crypto.randomBytes(length).toString("hex");
}

function normalizeDomains(value: string[]) {
  return value
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean)
    .map((domain) => domain.replace(/^https?:\/\//, "").replace(/\/$/, ""));
}

function toProjectRecord(document: ProjectDocument): ProjectRecord {
  return {
    id: document._id,
    ownerUserId: document.ownerUserId,
    manageToken: document.manageToken,
    publicToken: document.publicToken,
    projectName: document.projectName,
    clientName: document.clientName,
    contactEmail: document.contactEmail,
    invoiceUrl: document.invoiceUrl,
    customMessage: document.customMessage,
    allowedDomains: document.allowedDomains,
    status: document.status,
    archivedAt: document.archivedAt,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

async function getProjectsCollection() {
  if (!globalProjectsCache.__digitalDeadmanProjectsCollectionPromise) {
    globalProjectsCache.__digitalDeadmanProjectsCollectionPromise = (async () => {
      const db = await getMongoDb();
      const collection = db.collection<ProjectDocument>(collectionName);

      await collection.createIndexes([
        { key: { manageToken: 1 }, unique: true },
        { key: { publicToken: 1 }, unique: true },
        { key: { ownerUserId: 1, archivedAt: 1, createdAt: -1 } },
      ]);

      return collection;
    })();
  }

  return globalProjectsCache.__digitalDeadmanProjectsCollectionPromise;
}

export async function createProject(input: CreateProjectInput) {
  const collection = await getProjectsCollection();
  const now = new Date().toISOString();

  const project: ProjectDocument = {
    _id: crypto.randomUUID(),
    ownerUserId: input.ownerUserId,
    manageToken: createToken(),
    publicToken: createToken(),
    projectName: input.projectName.trim(),
    clientName: input.clientName.trim(),
    contactEmail: input.contactEmail.trim(),
    invoiceUrl: input.invoiceUrl.trim(),
    customMessage: input.customMessage.trim(),
    allowedDomains: normalizeDomains(input.allowedDomains),
    status: "pending",
    archivedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(project);
  return toProjectRecord(project);
}

export async function getProjectByManageToken(manageToken: string) {
  const collection = await getProjectsCollection();
  const project = await collection.findOne({ manageToken });
  return project ? toProjectRecord(project) : null;
}

export async function getProjectByPublicToken(publicToken: string) {
  const collection = await getProjectsCollection();
  const project = await collection.findOne({ publicToken });
  return project ? toProjectRecord(project) : null;
}

export async function updateProject(
  manageToken: string,
  input: UpdateProjectInput,
) {
  const collection = await getProjectsCollection();
  const now = new Date().toISOString();

  const result = await collection.findOneAndUpdate(
    { manageToken },
    {
      $set: {
        projectName: input.projectName.trim(),
        clientName: input.clientName.trim(),
        contactEmail: input.contactEmail.trim(),
        invoiceUrl: input.invoiceUrl.trim(),
        customMessage: input.customMessage.trim(),
        allowedDomains: normalizeDomains(input.allowedDomains),
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  return result ? toProjectRecord(result) : null;
}

export async function updateProjectStatus(
  manageToken: string,
  status: ProjectStatus,
) {
  const collection = await getProjectsCollection();
  const now = new Date().toISOString();

  const result = await collection.findOneAndUpdate(
    { manageToken },
    {
      $set: {
        status,
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  return result ? toProjectRecord(result) : null;
}

export async function archiveProject(manageToken: string) {
  const collection = await getProjectsCollection();
  const now = new Date().toISOString();

  const result = await collection.findOneAndUpdate(
    { manageToken },
    {
      $set: {
        archivedAt: now,
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  return result ? toProjectRecord(result) : null;
}

export async function unarchiveProject(manageToken: string) {
  const collection = await getProjectsCollection();
  const now = new Date().toISOString();

  const result = await collection.findOneAndUpdate(
    { manageToken },
    {
      $set: {
        archivedAt: null,
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  return result ? toProjectRecord(result) : null;
}

export async function deleteProject(manageToken: string) {
  const collection = await getProjectsCollection();
  await collection.deleteOne({ manageToken });
}

export async function listProjects(options?: {
  includeArchived?: boolean;
  ownerUserId?: string;
}) {
  const collection = await getProjectsCollection();
  const filter: Record<string, string | null> = {};

  if (!options?.includeArchived) {
    filter.archivedAt = null;
  }

  if (options?.ownerUserId) {
    filter.ownerUserId = options.ownerUserId;
  }

  const projects = await collection.find(filter).sort({ createdAt: -1 }).toArray();
  return projects.map(toProjectRecord);
}
