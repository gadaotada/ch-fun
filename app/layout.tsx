import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google"
import "./globals.css";

import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/theme-provider"

export const metadata: Metadata = {
  title: "Pushups Challenge",
  description: "A small app made for fun",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={inter.className}>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <Toaster
              toastOptions={{
                className: ``,
                duration: 4000
              }}
            />
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
