import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityModal from "../components/CommunityModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RELAY CE — Open Source OSINT Platform",
  description: "Transparent, ethical, and open-source OSINT platform. Discover and correlate digital footprints with zero retention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-[var(--color-text)] antialiased`}>
        <CommunityModal />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
