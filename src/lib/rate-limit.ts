import { getMongoDb } from "./mongodb";
import type { Collection } from "mongodb";

type RateLimitDocument = {
    _id: string;
    count: number;
    resetAt: Date;
};

type GlobalRateLimitCache = typeof globalThis & {
    __digitalDeadmanRateLimitCollectionPromise?: Promise<Collection<RateLimitDocument>>;
};

const globalRateLimitCache = globalThis as GlobalRateLimitCache;

async function getRateLimitCollection() {
    if (!globalRateLimitCache.__digitalDeadmanRateLimitCollectionPromise) {
        globalRateLimitCache.__digitalDeadmanRateLimitCollectionPromise = (async () => {
            const db = await getMongoDb();
            const collection = db.collection<RateLimitDocument>("rate_limits");

            await collection.createIndexes([{ key: { resetAt: 1 }, expireAfterSeconds: 0 }]);

            return collection;
        })();
    }

    return globalRateLimitCache.__digitalDeadmanRateLimitCollectionPromise;
}

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
    const collection = await getRateLimitCollection();
    const now = new Date();
    const resetAt = new Date(now.getTime() + windowSeconds * 1000);
    const existing = await collection.findOne({ _id: key }, { projection: { count: 1, resetAt: 1 } });

    let count = 1;

    if (!existing || existing.resetAt <= now) {
        const resetResult = await collection.findOneAndUpdate(
            { _id: key },
            {
                $set: {
                    count: 1,
                    resetAt,
                },
            },
            {
                upsert: true,
                returnDocument: "after",
            },
        );

        count = resetResult?.count ?? 1;
    } else {
        const incrementResult = await collection.findOneAndUpdate(
            { _id: key },
            {
                $inc: { count: 1 },
            },
            {
                returnDocument: "after",
            },
        );

        count = incrementResult?.count ?? existing.count + 1;
    }

    return { success: count <= limit, remaining: Math.max(0, limit - count) };
}
