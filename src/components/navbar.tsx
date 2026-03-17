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
                    className="text-lg font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
                >
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
                            {/* <Link
                                href="/create"
                                className="transition-colors hover:text-white"
                            >
                                Create Project
                            </Link> */}
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
                            className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 font-medium text-white transition-colors hover:bg-white/10"
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
