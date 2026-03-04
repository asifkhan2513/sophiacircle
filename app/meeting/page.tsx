import { Video } from "lucide-react";
import { Metadata } from "next";
import { lazy, Suspense } from "react";
import Loader from "@/app/loading";
const Meeting = lazy(() => import("../components/Meeting"));

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Join our live philosophical meetings and seminars. Engage in real-time debates and learning sessions with the Sophia Circle community.",
  keywords: [
    "philosophy meetings",
    "live discussion sessions",
    "philosophical seminars",
    "online philosophy community",
    "Sophia Circle meetings",
  ],
};

export default function MeetingPage() {
  return (
    <main className="grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <Video className="text-black" size={48} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Meeting
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          <Meeting />
        </Suspense>
      </div>
    </main>
  );
}
