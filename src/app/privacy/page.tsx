import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="flex min-h-screen flex-col bg-black font-sans text-white">
            <main className="mx-auto w-full max-w-[90rem] flex-1 px-6 py-16 sm:px-8">
                <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none space-y-8 text-zinc-400">
                    <section>
                        <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                        <p className="mt-4 leading-relaxed">
                            At Digital Deadman, we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
                        <p className="mt-4 leading-relaxed">
                            We collect information that you provide directly to us, such as your name, email address, and project details (including client names and project names). We also collect technical data such as IP addresses for security and rate limiting purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
                        <p className="mt-4 leading-relaxed">
                            We use the collected information to:
                        </p>
                        <ul className="mt-4 list-disc pl-6 space-y-2">
                            <li>Provide and maintain the Digital Deadman service.</li>
                            <li>Process your registrations and logins.</li>
                            <li>Manage your projects and protect your payments.</li>
                            <li>Prevent abuse and ensure the security of our platform.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">4. Data Security</h2>
                        <p className="mt-4 leading-relaxed">
                            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">5. Cookies</h2>
                        <p className="mt-4 leading-relaxed">
                            We use essential cookies to manage your authentication sessions. These cookies are necessary for the basic functionality of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">6. Changes to This Policy</h2>
                        <p className="mt-4 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
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
