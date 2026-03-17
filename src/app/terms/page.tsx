
export default function TermsOfService() {
    return (
        <div className="flex min-h-screen flex-col bg-black font-sans text-white">
            <main className="mx-auto w-full max-w-[90rem] flex-1 px-6 py-16 sm:px-8">
                <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>

                <div className="prose prose-invert max-w-none space-y-8 text-zinc-400">
                    <section>
                        <h2 className="text-2xl font-semibold text-white">1. Use of Service</h2>
                        <p className="mt-4 leading-relaxed">
                            By using Digital Deadman, you agree to these Terms of Service. Digital Deadman is a tool for freelance developers to protect their work until payment is complete. You agree to use the service only for its intended purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">2. No Guarantee of Payment</h2>
                        <p className="mt-4 leading-relaxed">
                            While Digital Deadman provides a payment protection layer, it does not guarantee that your clients will pay you. We are not responsible for any unpaid invoices or disputes between you and your clients.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">3. Ethical Use</h2>
                        <p className="mt-4 leading-relaxed">
                            You agree to use Digital Deadman ethically and professionally. You must not use the service to harass or blackmail clients. The service should be used as a professional payment reminder.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">4. Intellectual Property</h2>
                        <p className="mt-4 leading-relaxed">
                            The Digital Deadman service and its original content are and will remain the exclusive property of its creators. You are granted a limited license to use the service for your professional needs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">5. Limitation of Liability</h2>
                        <p className="mt-4 leading-relaxed">
                            Digital Deadman and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">6. Changes to Terms</h2>
                        <p className="mt-4 leading-relaxed">
                            We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page and your continued use of the service after such changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section>
                        <p className="mt-8 text-sm italic">
                            Last updated: March 17, 2026
                        </p>
                    </section>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 text-center text-sm text-zinc-600">
                <p>© {new Date().getFullYear()} Digital Deadman. All rights reserved.</p>
            </footer>
        </div>
    );
}
