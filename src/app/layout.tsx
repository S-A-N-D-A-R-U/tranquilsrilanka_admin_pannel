import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Serene Admin Dashboard",
  description: "Administrative dashboard for Serene Sri Lanka Tours",
  robots: { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Signed-out visitors only ever reach /login (see proxy.ts) — show it without the dashboard chrome
  if (!(await isAuthenticated())) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

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
