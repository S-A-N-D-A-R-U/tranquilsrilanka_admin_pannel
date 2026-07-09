import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Serene Admin Dashboard",
  description: "Administrative dashboard for Serene Sri Lanka Tours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          <Sidebar />
          <div className="admin-main">
            <Header />
            <main className="admin-content animate-fade-in">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
