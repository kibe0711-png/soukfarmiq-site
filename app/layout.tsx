import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FarmIQ by Altiora — Farm Operations Intelligence",
  description:
    "FarmIQ by Altiora. Complete ERP for modern agricultural enterprises — scheduling, compliance, harvest forecasting, labor & payroll.",
  verification: {
    google: "5decQpbLQcBWY_rkXW5nBOihc5fj37-UIuKm31eeb7o",
  },
  openGraph: {
    title: "FarmIQ by Altiora — Farm Operations Intelligence",
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
