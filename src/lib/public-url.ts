import { headers } from "next/headers";

export async function getBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";

  return `${protocol}://${host}`;
}
