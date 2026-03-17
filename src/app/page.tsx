import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black font-sans text-white selection:bg-zinc-500 selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-900/40 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] bg-zinc-900/30 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-400 backdrop-blur-md">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          Stop Getting Ghosted.
        </div>

        <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-7xl">
          Stop getting ghosted by clients.{" "}
          <span className="bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Secure your final payout
          </span>{" "}
          with one line of code.
        </h1>

        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Freelancers lose 20% of their income to "forgotten" final invoices. 
          Digital Deadman gives you the leverage you need to ensure every hour of your work is paid for. 
          Subtle, secure, and professional.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="#"
            className="group relative flex h-14 items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Get Early Access — $9/mo</span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <p className="text-sm text-zinc-500">
            Join 200+ developers securing their income.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              title: "One Line of Code",
              desc: "Just drop a script tag. No complex integration or backend needed.",
            },
            {
              title: "Smart Kill-Switch",
              desc: "Toggle project status from a simple dashboard. Re-enable instantly.",
            },
            {
              title: "Zero Friction",
              desc: "Display a subtle notice or disable non-essential features until paid.",
            },
          ].map((feature, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-left backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.04]">
              <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 w-full border-t border-white/5 py-12 text-center text-zinc-600">
        <p>© {new Date().getFullYear()} Digital Deadman. Built for the freelance community.</p>
      </footer>
    </div>
  );
}
