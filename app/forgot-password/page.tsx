import { lazy, Suspense } from "react";
const ForgotPassword = lazy(() => import("@/app/components/ForgotPassword"))
import { Metadata } from "next";
import Loader from "@/app/loading";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Reset your Sophia Circle account password safely and securely.",
};

export default function ForgotPasswordPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background px-4">
            <Suspense fallback={<Loader />}>
                <ForgotPassword />
            </Suspense>
        </main>
    );
}
