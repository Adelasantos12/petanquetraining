import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIEP - MERCI Program",
  description: "Seguimiento intensivo de petanca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="p-4 text-xs text-gray-500 border-t border-border bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
              <div className="flex items-center space-x-2" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                <span>Developed by</span>
                <span className="font-bold text-[#002366]">ByEasy</span>
              </div>
              <div>
                © 2026 CIEP MERCI. Todos los derechos reservados.
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
