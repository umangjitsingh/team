"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SetupForm({ email }: { email: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, password, setupCode }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(
          result?.message ??
            "Owner setup could not be completed. Check the code and try again.",
        );
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Owner setup could not be completed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="rounded-xl border border-border bg-muted/60 px-4 py-3">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Owner account
        </p>
        <p className="mt-1 text-sm font-semibold">
          {email || "Owner email is not configured"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="owner-name">Your name</Label>
        <Input
          id="owner-name"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="setup-code">One-time setup code</Label>
        <Input
          id="setup-code"
          type="password"
          autoComplete="off"
          required
          value={setupCode}
          onChange={(event) => setSetupCode(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="new-password">Create a password</Label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="text-xs leading-5 text-muted-foreground">
          Use at least 12 characters. The setup code is used only to claim the
          first owner account.
        </p>
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="h-10" disabled={isSubmitting || !email}>
        {isSubmitting ? "Setting up account…" : "Create owner account"}
      </Button>
    </form>
  );
}
