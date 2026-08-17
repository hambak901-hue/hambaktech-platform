import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HambakTech",
    template: "%s | HambakTech",
  },
  description:
    "HambakTech Smart Digital Platform for NIN services, ICT training, payments, and digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}