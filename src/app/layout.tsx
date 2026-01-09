import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased gradient-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
