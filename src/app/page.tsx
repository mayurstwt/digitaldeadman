import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";


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
    <div className="flex flex-col bg-black font-sans text-white selection:bg-zinc-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-zinc-900/40 blur-[120px]" />
        <div className="absolute top-[60%] -right-[5%] h-[30%] w-[30%] rounded-full bg-zinc-900/30 blur-[100px]" />
      </div>



      <main className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-6 py-16 sm:px-8 sm:py-20 lg:py-32">
        <section
          id="top"
          className="scroll-mt-28 flex flex-col items-center text-center"
        >
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-md">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Protect Your Work.
          </div>

          <h1 className="mb-8 max-w-5xl text-5xl font-extrabold tracking-tight sm:text-8xl">
            Add a payment bar to the client website{" "}
            <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              until the final invoice is paid.
            </span>
          </h1>

          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-zinc-400 sm:text-2xl">
            Digital Deadman adds a clear top bar to the live site before handover.
            Keep your leverage until you get paid. Simple, visible, and professional.
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Link
              href="/register"
              className="boton-estelar h-16 px-10 text-xl font-bold shadow-xl shadow-white/10"
            >
              Get Started
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`star-${i}`}>
                  <svg
                    viewBox="0 0 784.11 815.53"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}

                  >
                    <path
                      className="fil-estrella"
                      d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    />
                  </svg>
                </div>
              ))}
            </Link>
            <p className="max-w-xs text-sm text-zinc-500 sm:text-left">
              Protect your next project in minutes.
            </p>
          </div>
        </section>

        <section id="demo" className="mt-32 scroll-mt-28">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              See in Action
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Watch how Digital Deadman protects your work. A simple,
              non-destructive bar that keeps your leverage until the invoice is paid.
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Device Mockup */}
            <div className="relative rounded-[2.5rem] border-[8px] border-zinc-800 bg-zinc-900 p-2 shadow-2xl sm:border-[12px]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/5 bg-black shadow-inner">
                {/* Browser Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="hidden h-5 w-64 rounded-md bg-black/40 px-3 py-0.5 text-[10px] text-zinc-500 sm:block">
                    https://client-staging-site.com
                  </div>
                  <div className="h-4 w-4 rounded bg-zinc-800" />
                </div>

                {/* Website Content with Payment Bar */}
                <div className="relative min-h-[400px] bg-stone-50 text-stone-900 sm:min-h-[500px]">
                  {/* Digital Deadman Bar */}
                  <div className="flex flex-col items-center justify-between gap-2 border-b border-red-500/20 bg-red-500/10 px-6 py-3 sm:flex-row">
                    <div className="text-center sm:text-left">
                      <p className="text-xs font-bold text-red-600 sm:text-sm">
                        Final payment pending
                      </p>
                      <p className="text-[10px] text-red-500/80 sm:text-xs">
                        This project is under freelancer protection until the final invoice is cleared.
                      </p>
                    </div>
                    <div className="rounded-full border border-red-400/30 bg-red-500/5 px-3 py-1 text-[10px] font-bold text-red-500">
                      Protected by Digital Deadman
                    </div>
                  </div>

                  {/* Mock Site Content */}
                  <div className="p-8">
                    <div className="mb-10 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-10 text-white shadow-xl">
                      <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium tracking-wider text-white/60 uppercase">
                        Case Study
                      </div>
                      <h3 className="mb-4 text-4xl font-bold tracking-tight">
                        Premium Studio Website
                      </h3>
                      <p className="max-w-md text-zinc-400">
                        A full-service digital experience for a modern architecture firm.
                        Ready for final handover and live deployment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 transition-shadow hover:shadow-md">
                          <div className="mb-4 h-32 rounded-xl bg-zinc-100" />
                          <div className="h-4 w-2/3 rounded-full bg-zinc-200" />
                          <div className="mt-2 h-3 w-1/2 rounded-full bg-zinc-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -inset-48 -z-10 bg-red-500/5 blur-[120px] rounded-full" />
          </div>
        </section>


        <section id="how-it-works" className="mt-32 scroll-mt-28">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Secure your projects in three simple steps.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl px-4">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 hidden h-0.5 w-full bg-zinc-800 sm:block" />

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-4">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-zinc-900 shadow-xl shadow-black/50">
                  <svg className="h-10 w-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">Step 1</p>
                <h3 className="mb-3 text-xl font-bold text-white">Create a Project</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-zinc-400">
                  Generate a unique protection token for your client website in under a minute.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-zinc-900 shadow-xl shadow-black/50">
                  <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">Step 2</p>
                <h3 className="mb-3 text-xl font-bold text-white">Embed the Script</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-zinc-400">
                  Paste the generated snippet into the client's website code before final handover.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-zinc-900 shadow-xl shadow-black/50">
                  <svg className="h-10 w-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A4.833 4.833 0 0112 15.75a4.833 4.833 0 01-7.5-5.418V21" />
                  </svg>
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">Step 3</p>
                <h3 className="mb-3 text-xl font-bold text-white">Get Paid & Release</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-zinc-400">
                  Mark the project as paid on your dashboard, and the bar disappears instantly.
                </p>
              </div>
            </div>
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

        <section id="value" className="mt-32 px-4">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] p-10 shadow-2xl ring-1 ring-white/10 sm:p-16">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-red-500/80">+ 2.5 hrs</span>
                <span className="text-zinc-400">chasing unpaid invoices</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-red-500/80">+ 4.0 hrs</span>
                <span className="text-zinc-400">drafting reminder emails</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-red-500/80">+ 3.5 hrs</span>
                <span className="text-zinc-400">legal anxiety & overthinking</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-red-500/80">+ 5.0 hrs</span>
                <span className="text-zinc-400">handling client 'ghosting'</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-red-500/80">+ ∞ hrs</span>
                <span className="text-zinc-400 italic">wondering if you'll ever get paid...</span>
              </div>
            </div>

            <div className="mt-12 border-t border-white/5 pt-10 text-center">
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="text-red-500">= 15+ hours</span> saved per project
                <span className="ml-3 inline-block animate-pulse">🔒</span>
              </p>
            </div>
          </div>
        </section>

        <section id="why-use" className="mt-32 px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Why Use <span className="text-[#c1f031]">Digital Deadman?</span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* Option 1: Legal */}
            <div className="relative rounded-[2rem] border border-red-500/20 bg-red-500/[0.02] p-8 transition-colors hover:bg-red-500/[0.04]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Hire Lawyers</h3>
              <p className="text-zinc-400">
                Expensive: Pay hundreds or thousands for legal fees, plus the long wait for responses and court dates.
              </p>
            </div>

            {/* Option 2: Manual */}
            <div className="relative rounded-[2rem] border border-amber-500/20 bg-amber-500/[0.02] p-8 transition-colors hover:bg-amber-500/[0.04]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Manual Nagging</h3>
              <p className="text-zinc-400">
                Stressful: Constant emails, awkward phone calls, and the uncertainty of being ignored by the client.
              </p>
            </div>

            {/* Option 3: Digital Deadman */}
            <div className="relative rounded-[2rem] border-2 border-[#c1f031] bg-[#c1f031]/[0.05] p-8 shadow-[0_0_50px_-12px_rgba(193,240,49,0.3)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#c1f031] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                Best Choice
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c1f031]/20 text-[#c1f031]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Digital Deadman</h3>
              <p className="text-zinc-400">
                Professional: Automated, non-destructive, and highly effective. Keep your leverage without the drama.
              </p>
            </div>
          </div>
        </section>


        <section id="faq" className="mt-32 scroll-mt-28">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Questions people will ask before they try it.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
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
    </div >
  );
}
