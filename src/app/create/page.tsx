import Link from "next/link";
import { createProjectAction, logoutAction } from "@/app/actions";
import { requireCurrentUser } from "@/lib/auth";

type CreatePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function CreatePage({ searchParams }: CreatePageProps) {
  await requireCurrentUser();
  const params = await searchParams;
  const showError = params.error === "missing-fields";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-16 text-white sm:px-8">


      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
          Create Project
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Generate a real payment-bar script.
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Fill this once, then the app will generate your private management link
          and the exact script tag to install on the client website.
        </p>

        {showError ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Project name and client name are required.
          </div>
        ) : null}

        <form action={createProjectAction} className="mt-8 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Project name</span>
            <input
              name="projectName"
              required
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="Marketing site redesign"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Client name</span>
            <input
              name="clientName"
              required
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="Acme Studio"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Freelancer email</span>
            <input
              name="contactEmail"
              type="email"
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Invoice URL</span>
            <input
              name="invoiceUrl"
              type="url"
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="https://payments.example.com/invoice/123"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">
              Allowed domains
            </span>
            <input
              name="allowedDomains"
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="clientsite.com, www.clientsite.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">
              Custom message
            </span>
            <textarea
              name="customMessage"
              rows={4}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="This project remains under freelancer protection until the final invoice is cleared."
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-xl bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Create Project
          </button>
        </form>
      </div>
    </main>
  );
}
