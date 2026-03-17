import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionValue,
  sessionCookieName,
  verifySessionValue,
} from "@/lib/session";
import { getUserById, type UserRecord } from "@/lib/users";

export async function setSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, createSessionValue(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function getCurrentUser(): Promise<UserRecord | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(sessionCookieName)?.value;
  const userId = verifySessionValue(raw);

  if (!userId) {
    return null;
  }

  return getUserById(userId);
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
