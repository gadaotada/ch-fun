import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../app/api/auth/[...nextauth]/options";
import { ModeToggle } from "../components/ui/theme-toggle";
import LoginForm from "../components/login/Login";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="fixed top-2 left-2">
        <ModeToggle />
      </div>
      <LoginForm />
    </main>
  );
};