import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | perform.",
    default: "perform. | High Performance Tracking",
  },
  description: "Elite performance tracking for athletes.",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "perform.",
    description: "Elite performance tracking for athletes.",
    images: ["/logo.jpg"],
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <main className="flex-grow">
              {children}
            </main>
          <footer className="py-12 px-8 border-t border-border bg-white text-gray-secondary">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-4">
                <span className="text-2xl font-bold text-graphite tracking-tighter">perform.</span>
                <p className="max-w-xs text-sm">
                  The standard in elite sports tracking and diagnostic methodology.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 text-sm">
                <div className="space-y-3">
                  <h4 className="font-bold text-graphite">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="/privacy" className="hover:text-accent-orange transition-colors">Privacy</a></li>
                    <li><a href="/terms" className="hover:text-accent-orange transition-colors">Terms</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-graphite">Platform</h4>
                  <ul className="space-y-2">
                    <li><a href="/login" className="hover:text-accent-orange transition-colors">Sign in</a></li>
                    <li><a href="/apply" className="hover:text-accent-orange transition-colors">Apply</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
               <span>© 2026 perform.</span>
               <div className="flex items-center space-x-2">
                <span>By</span>
                <span className="text-[#002366]">ByEasy</span>
              </div>
            </div>
          </footer>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
