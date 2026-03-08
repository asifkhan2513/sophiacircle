import { lazy, Suspense } from "react";
const Signup = lazy(() => import("@/app/components/Signup"))
import { Metadata } from "next";
import Loader from "@/app/loading";

export const metadata: Metadata = {
    title: "Signup",
    description: "Join the Sophia Circle philosophical community.",
};

export default function SignupPage() {
    return (
        <main className="grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <Suspense fallback={<Loader />}>
                <Signup />
            </Suspense>
        </main>
    );
}
