"use client";

import { deleteProjectAction } from "@/app/actions";

interface DeleteProjectButtonProps {
    manageToken: string;
}

export function DeleteProjectButton({ manageToken }: DeleteProjectButtonProps) {
    return (
        <form action={deleteProjectAction} className="w-full sm:w-auto">
            <input type="hidden" name="manageToken" value={manageToken} />
            <input type="hidden" name="returnPath" value="/projects" />
            <button
                type="submit"
                className="w-full inline-flex h-11 items-center justify-center rounded-xl border border-red-500/30 px-4 font-semibold text-red-300 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-200"
                onClick={(e) => {
                    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
                        e.preventDefault();
                    }
                }}
            >
                Delete
            </button>
        </form>
    );
}
