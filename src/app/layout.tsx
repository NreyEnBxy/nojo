import type { Metadata } from "next";
import "./globals.css";

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
      className="antialiased bg-black text-white selection:bg-neutral-800 selection:text-white"
      suppressHydrationWarning
    >
      <body 
        className="bg-black text-white" 
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
