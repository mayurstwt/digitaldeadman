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

export default async function FAQPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/#faq");
    }

    return (
        <div className="flex min-h-screen flex-col bg-black font-sans text-white">
            <main className="mx-auto w-full max-w-[90rem] flex-1 px-6 py-16 sm:px-8">
                <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:p-10">
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
                            FAQ
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            Questions people will ask before they try it.
                        </h1>
                        <p className="mt-6 text-lg text-zinc-400">
                            Everything you need to know about setting up and using Digital Deadman.
                        </p>
                    </div>

                    <div className="mt-12 space-y-6">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group rounded-[1.75rem] border border-white/10 bg-black/30 p-6 sm:p-8 transition-colors hover:bg-white/[0.04]"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold text-white sm:text-xl marker:content-none">
                                    <span>{faq.question}</span>
                                    <span className="text-3xl leading-none text-zinc-500 transition-transform group-open:rotate-45">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-6 max-w-4xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#121212] p-8 lg:p-10 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
                    <p className="text-zinc-400 mb-8">Reach out on social media or open a GitHub issue.</p>
                    <div className="flex justify-center gap-6">
                        <Link href="https://x.com/mayurstwt" className="text-white hover:underline">X (@mayurstwt)</Link>
                        <Link href="https://github.com/mayurstwt" className="text-white hover:underline">GitHub</Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
