"use client";

import { useState } from "react";

type CopyButtonProps = {
  label: string;
  value: string;
};

export function CopyButton({ label, value, className }: CopyButtonProps & { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 w-full sm:w-auto ${className || ""}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
