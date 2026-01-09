import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "NYC EI Policy Training | Master Compliance in 30 Minutes",
  description: "Interactive training course for NYC Early Intervention Program policies. Learn critical timelines, compliance requirements, and best practices for Service Coordinators and Providers.",
  keywords: ["NYC", "Early Intervention", "EI", "Policy", "Training", "Compliance", "Service Coordinator", "IFSP"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
