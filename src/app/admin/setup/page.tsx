import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthShell } from "@/components/admin/auth-shell";
import { SetupForm } from "@/components/admin/setup-form";
import { getAdminSession } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Set up owner access | Team Plus Construction",
};

export default async function AdminSetupPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  const existingAccount = await db.user.findFirst();
  if (existingAccount) redirect("/admin/sign-in");

  const adminEmail = process.env.TEAM_PLUS_ADMIN_EMAIL?.trim() ?? "";
  const setupConfigured = Boolean(
    adminEmail && (process.env.TEAM_PLUS_ADMIN_SETUP_CODE?.length ?? 0) >= 16,
  );

  return (
    <AuthShell
      eyebrow="First-time owner setup"
      title="Claim your gallery."
      intro="Create the owner account to add and manage finished project photos."
    >
      {setupConfigured ? (
        <SetupForm email={adminEmail} />
      ) : (
        <p className="text-sm text-destructive" role="alert">
          Set TEAM_PLUS_ADMIN_SETUP_CODE to at least 16 characters in project
          Vars, then return here.
        </p>
      )}
    </AuthShell>
  );
}
