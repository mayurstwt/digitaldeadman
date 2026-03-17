import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { updateProjectAction } from "@/app/actions";
import { requireCurrentUser } from "@/lib/auth";
import { getProjectByManageToken } from "@/lib/projects";

type EditProjectPageProps = {
  params: Promise<{
    manageToken: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditProjectPage({
  params,
  searchParams,
}: EditProjectPageProps) {
  const { manageToken } = await params;
  const query = await searchParams;
  const user = await requireCurrentUser();
  const project = await getProjectByManageToken(manageToken);

  if (!project) {
    notFound();
  }

  if (project.ownerUserId !== user.id) {
    redirect("/projects");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-16 text-white sm:px-8">


      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
          Edit Project
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {project.projectName}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Update project details, domain allowlist, invoice link, and the custom
          message shown in the payment bar.
        </p>

        {query.error === "missing-fields" ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Project name and client name are required.
          </div>
        ) : null}

        <form action={updateProjectAction} className="mt-8 grid gap-5">
          <input type="hidden" name="manageToken" value={project.manageToken} />

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Project name</span>
            <input
              name="projectName"
              required
              defaultValue={project.projectName}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Client name</span>
            <input
              name="clientName"
              required
              defaultValue={project.clientName}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Freelancer email</span>
            <input
              name="contactEmail"
              type="email"
              defaultValue={project.contactEmail}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Invoice URL</span>
            <input
              name="invoiceUrl"
              type="url"
              defaultValue={project.invoiceUrl}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">
              Allowed domains
            </span>
            <input
              name="allowedDomains"
              defaultValue={project.allowedDomains.join(", ")}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">
              Custom message
            </span>
            <textarea
              name="customMessage"
              rows={4}
              defaultValue={project.customMessage}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-xl bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Save Changes
          </button>
        </form>
      </section>
    </main>
  );
}
