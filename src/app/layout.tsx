import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Deadman",
  description: "A payment protection bar for freelancers before final handover.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
