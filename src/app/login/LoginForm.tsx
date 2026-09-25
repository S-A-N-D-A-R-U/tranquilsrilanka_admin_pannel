"use client";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/authActions";

export default function LoginForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction}>
      <input type="hidden" name="from" value={from} />
      <div className="form-group">
        <label htmlFor="username" className="form-label">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="form-input" />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-[var(--danger)] mb-4">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
