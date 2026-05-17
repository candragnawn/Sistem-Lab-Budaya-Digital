import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const lora = Lora({ subsets: ["latin"], variable: '--font-lora' });

export const metadata: Metadata = {
  title: "SIWADA - Sistem Informasi Warisan Budaya",
  description: "Platform akademik terpusat untuk arsip jurnal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${lora.className} antialiased bg-[#f9f8f4]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
