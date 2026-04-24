import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { extractRouterConfig } from "@silo-storage/sdk-next";
import { SiloRouterConfigProvider } from "@/lib/upload";
import { fileRouter } from "@/upload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silo upload",
  description: "Barebones Silo Storage upload demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiloRouterConfigProvider routerConfig={extractRouterConfig(fileRouter)}>
          {children}
        </SiloRouterConfigProvider>
      </body>
    </html>
  );
}
