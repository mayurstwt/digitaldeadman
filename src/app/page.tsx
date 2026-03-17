import Link from "next/link";

const features = [
  {
    title: "One Script Tag",
    desc: "Add one small script before handover. No heavy integration or rebuild flow for the client site.",
  },
  {
    title: "Visible Payment Bar",
    desc: "If the final invoice is still open, a clear top bar appears on the website until you mark the project as paid.",
  },
  {
    title: "Built For Control",
    desc: "This works best while you still control deployment. That is the real protection against clients bypassing it.",
  },
];

const steps = [
  "You add one script tag to the client website before final handover.",
  "Our script checks your project status and injects a top payment bar if the invoice is still open.",
  "Once payment lands, you mark the project as paid and the bar disappears.",
];

const embedCode = `<script
  defer
  src="https://your-domain.com/embed/bar"
  data-ddm-status="pending"
  data-ddm-project="Marketing site"
  data-ddm-client="Acme Studio"
  data-ddm-contact-email="you@example.com"
  data-ddm-invoice-url="https://payments.example.com/invoice/123"
></script>`;

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-white selection:bg-zinc-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-zinc-900/40 blur-[120px]" />
        <div className="absolute top-[60%] -right-[5%] h-[30%] w-[30%] rounded-full bg-zinc-900/30 blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-6 py-16 sm:px-8 sm:py-20">
        <section className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-left">
            <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-md">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Stop Getting Ghosted.
            </div>

            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-7xl">
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
                href="#real-code"
                className="group relative flex h-14 items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Try Real Product</span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <p className="text-sm text-zinc-500">
                Copy the script, put it on the client site, and test it now.
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

        <section className="mt-24 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
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
          className="mt-12 grid gap-8 rounded-[2rem] border border-white/10 bg-[#101010] p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
              Real Product
            </p>
            <h2 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              This is the exact code your freelancer can install on a client
              website.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-zinc-400">
              Replace <code>your-domain.com</code> with your deployed Digital
              Deadman app URL. Keep{" "}
              <code>data-ddm-status=&quot;pending&quot;</code> while the invoice
              is open. Change it to <code>paid</code> to hide the bar.
            </p>
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
      </main>

      <footer className="relative z-10 w-full border-t border-white/5 py-12 text-center text-zinc-600">
        <p>
          © {new Date().getFullYear()} Digital Deadman. Built for freelancers
          who want clean leverage on final payment.
        </p>
      </footer>
    </div>
  );
}
