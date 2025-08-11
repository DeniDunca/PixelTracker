import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
});

export const metadata = {
  title: "Pixelino",
  description: "Habbit Tracker with Pixels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable}`}>{children}</body>
    </html>
  );
}
