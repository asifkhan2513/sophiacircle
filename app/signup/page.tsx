import Signup from "@/app/components/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup",
    description: "Join the Sophia Circle philosophical community.",
};

export default function SignupPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <Signup />
        </main>
    );
}
