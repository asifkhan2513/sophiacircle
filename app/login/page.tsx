import { lazy, Suspense } from "react";
import Loader from "@/app/loading";

const Login = lazy(() => import("@/app/components/Login"));
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Sophia Circle account.",
};

export default function LoginPage() {
  return (
    <main className="grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </main>
  );
}
