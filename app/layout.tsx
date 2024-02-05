import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/theme-provider"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Pushups Challenge",
  description: "A small app made for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <Toaster
              toastOptions={{
                className: ``,
              }}
            />
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
