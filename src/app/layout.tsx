import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "NOJO | Premium Cold Cola",
  description: "Experience the ultimate cold cola splash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} antialiased bg-black text-white selection:bg-neutral-800 selection:text-white`}
      suppressHydrationWarning
    >
      <body className={`${outfit.className} bg-black text-white`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
