import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/theme-provider"

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
              }}
            />
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
