import Link from "next/link";
import { redirect } from "next/navigation";
import { registerAction } from "@/app/actions";
import { RegisterSubmitButton } from "@/components/register-submit-button";
import { getCurrentUser } from "@/lib/auth";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/") ? params.next : "/projects";

  if (user) {
    redirect(next);
  }

  return (
    <main className="mx-auto flex flex-1 w-full max-w-[90rem] flex-col justify-center px-6 py-16 text-white sm:px-8">
      <div className="mx-auto w-full max-w-xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
            Register
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Sign up as a freelancer to create projects and manage client embeds.
          </p>

          {params.error === "invalid-input" ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              Fill all fields correctly and use a password with at least 8 characters.
            </div>
          ) : null}

          {params.error === "email-taken" ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              That email is already registered.
            </div>
          ) : null}

          <form action={registerAction} className="mt-8 grid gap-5">
            <input type="hidden" name="next" value={next} />

            <label className="grid gap-2">
              <span className="text-sm font-medium text-zinc-300">Name</span>
              <input
                name="name"
                required
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
                placeholder="Mayur"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-zinc-300">Email</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
                placeholder="you@example.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-zinc-300">Password</span>
              <input
                name="password"
                type="password"
                minLength={8}
                required
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
                placeholder="At least 8 characters"
              />
            </label>

            <RegisterSubmitButton />
          </form>

          <p className="mt-6 text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-white">
              Login here
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
