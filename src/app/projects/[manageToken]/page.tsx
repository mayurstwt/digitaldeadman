import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  archiveProjectAction,
  setProjectStatusAction,
  unarchiveProjectAction,
} from "@/app/actions";
import { requireCurrentUser } from "@/lib/auth";
import { CopyButton } from "@/components/copy-button";
import { getBaseUrl } from "@/lib/public-url";
import { getProjectByManageToken } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    manageToken: string;
  }>;
};

function buildEmbedCode(baseUrl: string, publicToken: string) {
  return `<script
  defer
  src="${baseUrl}/embed/bar"
  data-ddm-project-token="${publicToken}"
></script>`;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { manageToken } = await params;
  const user = await requireCurrentUser();
  const project = await getProjectByManageToken(manageToken);

  if (!project) {
    notFound();
  }

  if (project.ownerUserId !== user.id) {
    redirect("/projects");
  }

  const baseUrl = await getBaseUrl();
  const embedCode = buildEmbedCode(baseUrl, project.publicToken);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col px-6 py-16 text-white sm:px-8">


      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
          Project Dashboard
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.projectName}
            </h1>
            <p className="mt-2 text-zinc-400">
              Client: {project.clientName}
            </p>
          </div>

          <div
            className={`flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold lg:inline-flex ${project.status === "pending"
              ? "bg-red-500/15 text-red-200"
              : "bg-emerald-500/15 text-emerald-200"
              }`}
          >
            Status: {project.status}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 min-w-0">
            <div className="border-b border-white/10 px-5 py-4 text-sm text-zinc-500">
              Install this on the client website
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all p-5 text-sm leading-7 text-zinc-200">
              <code>{embedCode}</code>
            </pre>
            <div className="border-t border-white/10 px-5 py-4">
              <CopyButton label="Copy embed code" value={embedCode} />
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 p-5 min-w-0">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Controls
            </p>
            <p className="mt-3 leading-relaxed text-zinc-400">
              Use this project page to switch the live embed between{" "}
              <code>pending</code> and <code>paid</code>.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/projects/${project.manageToken}/edit`}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Edit Project
              </Link>
              <form action={setProjectStatusAction} className="w-full sm:w-auto">
                <input type="hidden" name="manageToken" value={project.manageToken} />
                <input type="hidden" name="status" value="pending" />
                <button
                  type="submit"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Mark Pending
                </button>
              </form>

              <form action={setProjectStatusAction} className="w-full sm:w-auto">
                <input type="hidden" name="manageToken" value={project.manageToken} />
                <input type="hidden" name="status" value="paid" />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  Mark Paid
                </button>
              </form>

              {project.archivedAt ? (
                <form action={unarchiveProjectAction} className="w-full sm:w-auto">
                  <input type="hidden" name="manageToken" value={project.manageToken} />
                  <input type="hidden" name="returnPath" value={`/projects/${project.manageToken}`} />
                  <button
                    type="submit"
                    className="w-full rounded-xl border border-white/10 px-4 py-3 font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    Restore Project
                  </button>
                </form>
              ) : (
                <form action={archiveProjectAction} className="w-full sm:w-auto">
                  <input type="hidden" name="manageToken" value={project.manageToken} />
                  <input type="hidden" name="returnPath" value="/projects" />
                  <button
                    type="submit"
                    className="w-full rounded-xl border border-white/10 px-4 py-3 font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    Archive Project
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 p-5 min-w-0">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Allowed domains
            </p>
            <p className="mt-3 break-all text-zinc-300">
              {project.allowedDomains.length > 0
                ? project.allowedDomains.join(", ")
                : "Any domain for now"}
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 p-5 min-w-0">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Management link
            </p>
            <p className="mt-3 break-all text-zinc-300">
              {baseUrl}/projects/{project.manageToken}
            </p>
            <div className="mt-4">
              <CopyButton
                label="Copy management link"
                value={`${baseUrl}/projects/${project.manageToken}`}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
