"use client";

import React, { lazy, Suspense } from "react";
import Loader from "@/app/loading";
import { Shield } from "lucide-react";

const AdminDashboard = lazy(() => import("@/app/components/AdminDashboard"));

export default function AdminPage() {
    return (
        <main className="grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <Suspense fallback={<Loader />}>
                    <AdminDashboard />
                </Suspense>
            </div>
        </main>
    );
}
