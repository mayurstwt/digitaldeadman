"use server";

import { redirect } from "next/navigation";
import { clearSession, requireCurrentUser, setSession } from "@/lib/auth";
import {
  archiveProject,
  createProject,
  getProjectByManageToken,
  unarchiveProject,
  updateProject,
  updateProjectStatus,
} from "@/lib/projects";
import { createUser, getUserByEmail, verifyUserCredentials } from "@/lib/users";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

async function getIp() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
  return ip;
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getSafeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/projects";
  }

  return value;
}

async function requireProjectAccess(manageToken: string) {
  const user = await requireCurrentUser();
  const project = await getProjectByManageToken(manageToken);

  if (!project) {
    redirect("/projects");
  }

  if (project.ownerUserId !== user.id) {
    redirect("/projects");
  }

  return { user, project };
}

export async function createProjectAction(formData: FormData) {
  const user = await requireCurrentUser();
  const projectName = getString(formData, "projectName");
  const clientName = getString(formData, "clientName");

  if (!projectName || !clientName) {
    redirect("/create?error=missing-fields");
  }

  const project = await createProject({
    ownerUserId: user.id,
    projectName,
    clientName,
    contactEmail: getString(formData, "contactEmail"),
    invoiceUrl: getString(formData, "invoiceUrl"),
    customMessage: getString(formData, "customMessage"),
    allowedDomains: getString(formData, "allowedDomains")
      .split(",")
      .map((domain) => domain.trim()),
  });

  redirect(`/projects/${project.manageToken}`);
}

export async function setProjectStatusAction(formData: FormData) {
  const manageToken = getString(formData, "manageToken");
  const nextStatus = getString(formData, "status");

  await requireProjectAccess(manageToken);

  if (nextStatus !== "pending" && nextStatus !== "paid") {
    redirect(`/projects/${manageToken}?error=invalid-status`);
  }

  await updateProjectStatus(manageToken, nextStatus);
  redirect(`/projects/${manageToken}`);
}

export async function updateProjectAction(formData: FormData) {
  const manageToken = getString(formData, "manageToken");
  const projectName = getString(formData, "projectName");
  const clientName = getString(formData, "clientName");

  await requireProjectAccess(manageToken);

  if (!manageToken || !projectName || !clientName) {
    redirect(`/projects/${manageToken}/edit?error=missing-fields`);
  }

  await updateProject(manageToken, {
    projectName,
    clientName,
    contactEmail: getString(formData, "contactEmail"),
    invoiceUrl: getString(formData, "invoiceUrl"),
    customMessage: getString(formData, "customMessage"),
    allowedDomains: getString(formData, "allowedDomains")
      .split(",")
      .map((domain) => domain.trim()),
  });

  redirect(`/projects/${manageToken}`);
}

export async function archiveProjectAction(formData: FormData) {
  const manageToken = getString(formData, "manageToken");
  const returnPath = getString(formData, "returnPath") || "/projects";

  await requireProjectAccess(manageToken);

  await archiveProject(manageToken);
  redirect(returnPath);
}

export async function unarchiveProjectAction(formData: FormData) {
  const manageToken = getString(formData, "manageToken");
  const returnPath = getString(formData, "returnPath") || "/projects";

  await requireProjectAccess(manageToken);

  await unarchiveProject(manageToken);
  redirect(returnPath);
}

export async function registerAction(formData: FormData) {
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = getSafeNextPath(getString(formData, "next") || "/projects");

  const ip = await getIp();
  const { success } = await rateLimit(`register:${ip}`, 3, 3600); // 3 registrations per hour

  if (!success) {
    redirect(`/register?error=too-many-requests&next=${encodeURIComponent(next)}`);
  }

  if (!name || !email || password.length < 8) {
    redirect(`/register?error=invalid-input&next=${encodeURIComponent(next)}`);
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    redirect(`/register?error=email-taken&next=${encodeURIComponent(next)}`);
  }

  const user = await createUser({
    name,
    email,
    password,
  });

  await setSession(user.id);
  redirect(next);
}

export async function loginAction(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = getSafeNextPath(getString(formData, "next") || "/projects");

  const ip = await getIp();
  const { success } = await rateLimit(`login:${ip}`, 5, 300); // 5 login attempts per 5 minutes

  if (!success) {
    redirect(`/login?error=too-many-requests&next=${encodeURIComponent(next)}`);
  }

  const user = await verifyUserCredentials(email, password);

  if (!user) {
    redirect(`/login?error=invalid-credentials&next=${encodeURIComponent(next)}`);
  }

  await setSession(user.id);
  redirect(next);
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
