import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/actions";
import { getCurrentUser } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/") ? params.next : "/projects";

  if (user) {
    redirect(next);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16 text-white sm:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
          Login
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Sign in to your account
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-400">
          Access your projects, update payment status, and manage embeds from one
          dashboard.
        </p>

        {params.error === "invalid-credentials" ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Invalid email or password.
          </div>
        ) : null}

        <form action={loginAction} className="mt-8 grid gap-5">
          <input type="hidden" name="next" value={next} />

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
              required
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition-colors focus:border-white/30"
              placeholder="Your password"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-500">
          No account yet?{" "}
          <Link href={`/register?next=${encodeURIComponent(next)}`} className="text-white">
            Register here
          </Link>
        </p>
      </section>
    </main>
  );
}
