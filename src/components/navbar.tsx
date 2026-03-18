import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

import { MobileMenu } from "./mobile-menu";

export async function Navbar() {
    const user = await getCurrentUser();

    return (
        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 py-4 sm:px-8">
                <Link
                    href={user ? "/projects" : "/"}
                    className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-[#c1f031]"
                    >
                        <path d="M5 10V7a5 5 0 0 1 10 0v3" />
                        <rect x="3" y="10" width="14" height="11" rx="2" ry="2" />
                        <path d="M7 10v4" />
                        <path d="M13 10v4" />
                        <circle cx="10" cy="15" r="1" />
                        <path d="M10 16v2" />
                    </svg>
                    Digital Deadman
                </Link>

                <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-400 font-medium">
                    <Link
                        href={user ? "/how-it-works" : "/#how-it-works"}
                        className="transition-colors hover:text-white"
                    >
                        How It Works
                    </Link>
                    <Link
                        href={user ? "/faq" : "/#faq"}
                        className="transition-colors hover:text-white"
                    >
                        FAQs
                    </Link>

                    {user ? (
                        <>
                            <Link
                                href="/projects"
                                className="transition-colors hover:text-white"
                            >
                                Dashboard
                            </Link>

                            <form action={logoutAction} className="inline">
                                <button
                                    type="submit"
                                    className="transition-colors hover:text-white cursor-pointer"
                                >
                                    Logout
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="boton-elegante"
                        >
                            Login
                        </Link>
                    )}
                </nav>

                <MobileMenu user={user} />
            </div>
        </header>
    );
}
