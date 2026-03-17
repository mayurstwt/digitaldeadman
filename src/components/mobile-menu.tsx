"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/actions";

type MobileMenuProps = {
    user: any;
};

export function MobileMenu({ user }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="sm:hidden">
            <button
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white outline-none"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 mx-6 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
                    <nav className="flex flex-col gap-4 text-base font-medium text-zinc-400">
                        <Link
                            href={user ? "/how-it-works" : "/#how-it-works"}
                            className="hover:text-white"
                            onClick={closeMenu}
                        >
                            How It Works
                        </Link>
                        <Link
                            href={user ? "/faq" : "/#faq"}
                            className="hover:text-white"
                            onClick={closeMenu}
                        >
                            FAQs
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    href="/projects"
                                    className="hover:text-white"
                                    onClick={closeMenu}
                                >
                                    Dashboard
                                </Link>
                                <form action={logoutAction} className="mt-2 pt-4 border-t border-white/5">
                                    <button
                                        type="submit"
                                        className="w-full text-left text-red-400 hover:text-red-300"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="mt-2 flex h-12 items-center justify-center rounded-xl bg-white text-lg font-bold text-black"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
}
