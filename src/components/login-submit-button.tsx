"use client";

import { useFormStatus } from "react-dom";

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 animate-spin"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        className="opacity-25"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        className="opacity-90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
    >
      {pending ? (
        <>
          <Spinner />
          <span>Logging in...</span>
        </>
      ) : (
        "Login"
      )}
    </button>
  );
}
