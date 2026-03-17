import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const steps = [
    "Create a project inside Digital Deadman and get your private management page.",
    "Paste the generated script tag into the client website before final handover.",
    "When payment lands, open your private page, mark the project as paid, and the bar disappears automatically.",
];

export default async function HowItWorksPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/#how-it-works");
    }

    return (
        <div className="flex min-h-screen flex-col bg-black font-sans text-white">
            <main className="mx-auto w-full max-w-[90rem] flex-1 px-6 py-16 sm:px-8">
                <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
                    <div>
                        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
                            How It Works
                        </p>
                        <h1 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            Simple enough to explain in under a minute.
                        </h1>
                        <p className="mt-6 max-w-lg leading-relaxed text-zinc-400">
                            Digital Deadman is built for the period between finishing the project and final handover.
                            It provides a clear, professional way to remind clients about final payment.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/register"
                                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-white px-6 font-bold text-black transition-transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className="flex gap-6 rounded-2xl border border-white/8 bg-black/30 p-6"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-black">
                                    {index + 1}
                                </div>
                                <p className="pt-1.5 text-zinc-300 text-lg leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-20 rounded-[2rem] border border-white/10 bg-[#121212] p-8 lg:p-10">
                    <h2 className="text-2xl font-semibold text-white mb-6">Detailed Flow</h2>
                    <div className="prose prose-invert max-w-none text-zinc-400 space-y-6">
                        <p>
                            When you create a project, our system generates a unique management token.
                            This token is tied to the embed script you place on your client&apos;s site.
                        </p>
                        <p>
                            The script is lightweight and asynchronous. It checks your project&apos;s status
                            from our API. If the status is <strong>pending</strong>, it injects a
                            professional notification bar at the top of the client&apos;s page.
                        </p>
                        <p>
                            Once you receive payment, you simply flip the toggle in your dashboard.
                            The next time the client site is loaded, the bar is gone. No code
                            changes required on the client side at that point.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
