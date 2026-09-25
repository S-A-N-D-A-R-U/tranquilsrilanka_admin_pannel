import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Serene Admin",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="glass-panel w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Serene Admin</h1>
        <p className="subtitle mt-1 mb-6">Sign in to manage the website.</p>
        <LoginForm from={from ?? "/"} />
      </div>
    </div>
  );
}
