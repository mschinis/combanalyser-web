import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { GoogleAnalytics } from "@next/third-parties/google";
import config from "@/config";

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
  title: "CombAnalyser",
  description: "Analyse your combustion inc cooks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full m-0 p-0">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
      >
        <Nav />
        <main className={"flex flex-col justify-stretch items-stretch grow"}>
          {children}
          <GoogleAnalytics gaId={config.googleAnalytics.id} />
        </main>
      </body>
    </html>
  );
}
