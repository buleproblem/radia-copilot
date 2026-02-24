import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radia – Global Radio Discovery",
  description: "Discover live radio stations from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0f", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
