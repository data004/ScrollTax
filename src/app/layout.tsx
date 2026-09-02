import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScrollTax | The Doomscroll Penalty Fund",
  description: "A productivity tool that uses Binance Agent OS to execute financial penalties when you exceed your screen time limits.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-gray-100 min-h-screen">
        <main className="max-w-4xl mx-auto p-6 md:p-12">
          <header className="mb-12 border-b-brutal border-border pb-6">
            <h1 className="text-4xl font-bold tracking-tighter text-primary">
              SCROLLTAX
            </h1>
            <p className="text-gray-400 mt-2 font-mono text-sm uppercase">
              Binance Agent OS Hackathon // Track B
            </p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
