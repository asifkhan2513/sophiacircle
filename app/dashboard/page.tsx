import { lazy, Suspense } from "react";
import Loader from "@/app/loading";

const Dashboard = lazy(() => import("@/app/components/Dashboard"));
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage your philosophical journey.",
};

export default function DashboardPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <Suspense fallback={<Loader />}>
                <Dashboard />
            </Suspense>
        </main>
    );
}
