import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const features = [
  {
    title: "Create A Project",
    desc: "Generate a management link and a tokenized script from inside Digital Deadman.",
  },
  {
    title: "Live Payment Status",
    desc: "The client website checks your live project status, so you can switch from pending to paid without editing the embed code again.",
  },
  {
    title: "Built For Control",
    desc: "This works best while you still control deployment. That is the real protection against clients bypassing it.",
  },
];

const steps = [
  "Create a project inside Digital Deadman and get your private management page.",
  "Paste the generated script tag into the client website before final handover.",
  "When payment lands, open your private page, mark the project as paid, and the bar disappears automatically.",
];

const faqs = [
  {
    question: "How do I install this on a client website?",
    answer:
      "Deploy Digital Deadman once, create a project, copy the generated script tag, and paste it into the client website before the closing body tag or in the global layout. If status is pending, the payment bar appears automatically.",
  },
  {
    question: "Can the client remove or bypass it?",
    answer:
      "Yes, if they fully control the codebase and hosting they can remove the script. This product is meant for the period before final handover, while you still control deployment.",
  },
  {
    question: "What happens after I get paid?",
    answer:
      "Change the script status from pending to paid and redeploy the client site. Once the page refreshes, the bar no longer appears.",
  },
  {
    question: "Will this break the client website?",
    answer:
      "The MVP is designed to stay lightweight and reversible. It only injects a fixed top bar and adjusts page spacing so the site content remains visible.",
  },
  {
    question: "Is this free to use right now?",
    answer:
      "Yes. The current MVP is free to use while the product flow is being tested with real freelance projects.",
  },
];

const embedCode = `<script
  defer
  src="https://your-domain.com/embed/bar"
  data-ddm-project-token="paste-token-from-your-dashboard"
></script>`;

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/projects");
  }

  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-white selection:bg-zinc-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-zinc-900/40 blur-[120px]" />
        <div className="absolute top-[60%] -right-[5%] h-[30%] w-[30%] rounded-full bg-zinc-900/30 blur-[100px]" />
      </div>



      <main className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-6 py-16 sm:px-8 sm:py-20">
        <section
          id="top"
          className="scroll-mt-28 grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="text-left">
            <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-md">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Stop Getting Ghosted.
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-7xl">
              Add a payment bar to the client website until the{" "}
              <span className="bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                final invoice is paid.
              </span>
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Digital Deadman adds a clear top bar to the live site before
              handover. It is simple, visible, and works best while you still
              control deployment.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/register"
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Create Account</span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <p className="text-sm text-zinc-500">
                Sign up, create a project, then copy the embed snippet for your client site.
              </p>
            </div>

          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-red-500/15 via-transparent to-white/5 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/40">
              <div className="border-b border-white/10 bg-[#171717] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="border-b border-red-400/20 bg-red-500/10 px-5 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-red-200">
                      Final payment pending
                    </p>
                    <p className="text-sm text-red-100/70">
                      This project remains under freelancer protection until the
                      invoice is cleared.
                    </p>
                  </div>
                  <div className="rounded-full border border-red-200/20 bg-red-200/10 px-3 py-1 text-xs font-medium text-red-100">
                    Protected by Digital Deadman
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-5 text-stone-900">
                <div className="mb-6 rounded-2xl bg-[linear-gradient(135deg,#111827,#374151)] px-5 py-10 text-white">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">
                    Client Website
                  </p>
                  <h2 className="max-w-sm text-3xl font-semibold leading-tight">
                    Premium studio website, ready to launch.
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-stone-100 p-4">
                    <div className="mb-3 h-24 rounded-xl bg-stone-200" />
                    <div className="h-3 w-20 rounded-full bg-stone-300" />
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-4">
                    <div className="mb-3 h-24 rounded-xl bg-stone-200" />
                    <div className="h-3 w-24 rounded-full bg-stone-300" />
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-4">
                    <div className="mb-3 h-24 rounded-xl bg-stone-200" />
                    <div className="h-3 w-16 rounded-full bg-stone-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-left backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <h3 className="mb-3 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section
          id="how-it-works"
          className="mt-24 scroll-mt-28 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              How It Works
            </p>
            <h2 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Simple enough to explain in under a minute.
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl border border-white/8 bg-black/30 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </div>
                <p className="pt-1 text-zinc-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="real-code"
          className="mt-12 scroll-mt-28 grid gap-8 rounded-[2rem] border border-white/10 bg-[#101010] p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Demo
            </p>
            <h2 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The real product now generates this script after project creation.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-zinc-400">
              Replace <code>your-domain.com</code> with your deployed Digital
              Deadman app URL. The app creates a unique token per project, and
              the embed reads live status from your private dashboard.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Open project generator
            </Link>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
            <div className="border-b border-white/10 px-5 py-4 text-sm text-zinc-500">
              Embed snippet
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-zinc-200">
              <code>{embedCode}</code>
            </pre>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#121212] p-7">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Can Clients Bypass It?
            </p>
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Yes, if they fully control the code and hosting.
            </h3>
            <p className="leading-relaxed text-zinc-400">
              That is why the product is meant for the period before final
              handover. The protection comes from keeping deployment control
              until payment is complete, not from pretending the script is
              impossible to remove.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#121212] p-7">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              MVP Rule
            </p>
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Keep it visible, professional, and reversible.
            </h3>
            <p className="leading-relaxed text-zinc-400">
              The first version should only inject a branded top bar tied to a
              unique project token and allowed domain. When the invoice is paid,
              you flip the status and the bar disappears.
            </p>
          </div>
        </section>

        <section
          id="faq"
          className="mt-12 scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:p-10"
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Questions people will ask before they try it.
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-white/10 bg-black/30 p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold text-white marker:content-none">
                  <span>{faq.question}</span>
                  <span className="text-2xl leading-none text-zinc-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 w-full border-t border-white/5 py-12 text-center text-zinc-600">
        <p>
          © {new Date().getFullYear()} Digital Deadman. Built for freelancers
          who want clean leverage on final payment.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/privacy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-white"
          >
            Terms of Service
          </Link>
          <Link
            href="https://x.com/mayurstwt"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            X
          </Link>
          <Link
            href="https://github.com/mayurstwt"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
