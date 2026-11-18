import { redirect } from "next/navigation";
import { AuthShell } from "@/components/admin/auth-shell";
import { SignInForm } from "@/components/admin/sign-in-form";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata = { title: "Owner sign in | Team Plus Construction" };

export default async function AdminSignInPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <AuthShell
      eyebrow="Owner access"
      title="Welcome back."
      intro="Sign in to update your project gallery."
    >
      <SignInForm />
    </AuthShell>
  );
}
