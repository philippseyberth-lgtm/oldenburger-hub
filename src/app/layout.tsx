import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oldenburger Hub",
  description: "Management platform for Oldenburger Interior",
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
