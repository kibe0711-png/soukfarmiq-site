import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Altiora — Farm Operations Intelligence",
  description:
    "SoukFarmIQ by Altiora. Complete ERP for modern agricultural enterprises — scheduling, compliance, harvest forecasting, labor & payroll.",
  openGraph: {
    title: "Altiora — Farm Operations Intelligence",
    description:
      "From planning to harvest — one platform for East African agricultural enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
