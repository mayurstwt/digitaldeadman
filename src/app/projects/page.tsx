import Link from "next/link";
import {
  archiveProjectAction,
  setProjectStatusAction,
  unarchiveProjectAction,
} from "@/app/actions";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { requireCurrentUser } from "@/lib/auth";
import { CopyButton } from "@/components/copy-button";
import { listProjects } from "@/lib/projects";

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function ProjectsPage() {
  const user = await requireCurrentUser();
  const projects = await listProjects({
    includeArchived: true,
    ownerUserId: user.id,
  });
  const activeProjects = projects.filter((project) => !project.archivedAt);
  const archivedProjects = projects.filter((project) => project.archivedAt);
  const pendingCount = activeProjects.filter(
    (project) => project.status === "pending",
  ).length;
  const paidCount = activeProjects.filter((project) => project.status === "paid").length;

  return (
    <main className="mx-auto flex w-full max-w-[90rem] flex-col px-6 py-16 text-white sm:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
            Freelancer Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Your projects
          </h1>
        </div>

        {projects.length > 0 && (
          <Link
            href="/create"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Create project
          </Link>
        )}
      </div>

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Total
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">{activeProjects.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Pending
          </p>
          <p className="mt-3 text-4xl font-semibold text-red-200">{pendingCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Paid
          </p>
          <p className="mt-3 text-4xl font-semibold text-emerald-200">{paidCount}</p>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 px-6 py-5 text-sm text-zinc-500">
          Manage your live embeds
        </div>

        {activeProjects.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg text-zinc-300">No projects yet.</p>
            <p className="mt-2 text-zinc-500">
              Create your first project to generate an embed script.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-6 px-6 py-8 lg:grid lg:grid-cols-[1.2fr_0.8fr_0.8fr]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-white">
                      {project.projectName}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${project.status === "pending"
                        ? "bg-red-500/15 text-red-200"
                        : "bg-emerald-500/15 text-emerald-200"
                        }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-2 text-zinc-400">Client: {project.clientName}</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Updated {formatTimestamp(project.updatedAt)}
                  </p>
                  <p className="mt-3 break-all text-sm text-zinc-500">
                    {project.allowedDomains.length > 0
                      ? project.allowedDomains.join(", ")
                      : "Any domain allowed"}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Quick actions
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/projects/${project.manageToken}`}
                      className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                    >
                      Open project
                    </Link>
                    <Link
                      href={`/projects/${project.manageToken}/edit`}
                      className="flex h-11 items-center justify-center rounded-xl border border-white/10 px-4 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                    >
                      Edit
                    </Link>

                    <form action={setProjectStatusAction} className="w-full sm:w-auto">
                      <input type="hidden" name="manageToken" value={project.manageToken} />
                      <input type="hidden" name="status" value="pending" />
                      <button
                        type="submit"
                        className="w-full inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-4 font-semibold text-white transition-colors hover:bg-white/10"
                      >
                        Mark pending
                      </button>
                    </form>

                    <form action={setProjectStatusAction} className="w-full sm:w-auto">
                      <input type="hidden" name="manageToken" value={project.manageToken} />
                      <input type="hidden" name="status" value="paid" />
                      <button
                        type="submit"
                        className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 font-semibold text-black transition-colors hover:bg-zinc-200"
                      >
                        Mark paid
                      </button>
                    </form>

                    <form action={archiveProjectAction} className="w-full sm:w-auto">
                      <input type="hidden" name="manageToken" value={project.manageToken} />
                      <input type="hidden" name="returnPath" value="/projects" />
                      <button
                        type="submit"
                        className="w-full inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-4 font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                      >
                        Archive
                      </button>
                    </form>

                    <DeleteProjectButton manageToken={project.manageToken} />
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/20 p-4 min-w-0">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Embed token
                  </p>
                  <p className="mt-4 break-all text-sm text-zinc-300">
                    {project.publicToken}
                  </p>
                  <div className="mt-4">
                    <CopyButton label="Copy token" value={project.publicToken} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 px-6 py-5 text-sm text-zinc-500">
          Archived projects
        </div>

        {archivedProjects.length === 0 ? (
          <div className="px-6 py-10 text-zinc-500">No archived projects yet.</div>
        ) : (
          <div className="divide-y divide-white/10">
            {archivedProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-6 px-6 py-8 lg:grid lg:grid-cols-[1.3fr_0.7fr]"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {project.projectName}
                  </h2>
                  <p className="mt-2 text-zinc-400">Client: {project.clientName}</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Archived {project.archivedAt ? formatTimestamp(project.archivedAt) : ""}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Actions
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/projects/${project.manageToken}`}
                      className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                    >
                      Open project
                    </Link>
                    <form action={unarchiveProjectAction} className="w-full sm:w-auto">
                      <input type="hidden" name="manageToken" value={project.manageToken} />
                      <input type="hidden" name="returnPath" value="/projects" />
                      <button
                        type="submit"
                        className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 font-semibold text-black transition-colors hover:bg-zinc-200"
                      >
                        Restore
                      </button>
                    </form>

                    <DeleteProjectButton manageToken={project.manageToken} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
