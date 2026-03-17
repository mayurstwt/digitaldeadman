import { getMongoDb } from "./mongodb";

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
    const db = await getMongoDb();
    const collection = db.collection("rate_limits");

    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - windowSeconds;

    // Clean up old entries
    await collection.deleteMany({
        key,
        timestamp: { $lt: windowStart },
    });

    const count = await collection.countDocuments({
        key,
        timestamp: { $gte: windowStart },
    });

    if (count >= limit) {
        return { success: false, remaining: 0 };
    }

    await collection.insertOne({
        key,
        timestamp: now,
    });

    return { success: true, remaining: limit - count - 1 };
}
