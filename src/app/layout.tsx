import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Neurons } from "./components/background/neurons-lazy";
import { PageGridLines } from "./components/page-grid-lines";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const fontBrand = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connecting Dots — Stuff about Computer Science ",
  description:
    "Learn DSA, web development, AI/ML, and system design with notes and courses. Projects-first teaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontBrand.variable} ${geistMono.variable} h-full`}
    >
      <body className="relative flex min-h-full w-full flex-col">
        <Neurons />
        <PageGridLines />
        <div className="relative z-10 flex min-h-full w-full flex-1 flex-col">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>  
    </html>
  );
} 
