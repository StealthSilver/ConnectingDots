import type { Metadata } from "next";
import { Chakra_Petch, Geist_Mono, Kalam, Noto_Sans } from "next/font/google";
import { PageGridLines } from "./components/page-grid-lines";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-chakra-petch",
});

const kalam = Kalam({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kalam",
  weight: ["300", "400", "700"],
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
      className={`${notoSans.variable} ${geistMono.variable} ${chakraPetch.variable} ${kalam.variable} h-full`}
    >
      <head>
        {/* Runs synchronously before React hydrates — no client-side script warning */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="relative flex min-h-full w-full flex-col">
        <PageGridLines />
        <div className="relative z-10 flex min-h-full w-full flex-1 flex-col">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>  
    </html>
  );
} 
