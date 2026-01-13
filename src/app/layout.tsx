import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import CyanCursor from "@/components/cursor";
import { ThemeProvider } from "@/components/theme-provider";
// import Providers from "@/app/providers";
import Providers from "@/app/providers";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";

import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Capsulr | On-Chain Time Capsule Network",
  description: "Mint digital time capsules as NFTs and lock your messages, art, predictions or secrets for the future.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >

        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
            <Header />
            {children}
            <CyanCursor />
            <Footer />
            <Toaster />
          </ThemeProvider>
        </Providers>


      </body>
    </html>
  );
}
