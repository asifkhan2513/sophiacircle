import React from "react";
import {
  Target,
  Eye,
  Compass,
  Sparkles,
  Brain,
  Heart,
  Activity,
  Scale,
  Cpu,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";

export default function About() {
  return (
    <div className="space-y-20">
      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border-2 border-black p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform duration-500">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white mb-6">
            <Target size={28} />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
            Mission
          </h3>
          <p className="text-black/70 leading-relaxed font-medium">
            To cultivate a sanctuary for deep intellectual inquiry, providing
            the tools and community necessary to bridge the gap between ancient
            wisdom and modern living.
          </p>
        </div>

        <div className="bg-white border-2 border-black p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform duration-500">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white mb-6">
            <Eye size={28} />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
            Vision
          </h3>
          <p className="text-black/70 leading-relaxed font-medium">
            To become the global nexus for philosophical discourse, where
            history&apos;s greatest ideas are revitalized to solve the
            complexities of the 21st century.
          </p>
        </div>

        <div className="bg-white border-2 border-black p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform duration-500">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white mb-6">
            <Compass size={28} />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
            Why We Exist
          </h3>
          <p className="text-black/70 leading-relaxed font-medium">
            In an era of digital noise, Sophia Circle exists to restore the art
            of slow, meaningful thought. We provide space for those seeking
            depth over distraction.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Our Philosophical Framework
          </h2>
          <p className="text-black/50 font-medium italic">
            &quot;An unexamined life is not worth living.&quot; — Socrates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Reality */}
          <PhilosophicalCard
            icon={<Activity size={24} />}
            title="Reality"
            content="We explore the nature of the objective world versus subjective perception, investigating the underlying structures that define our existence."
          />
          {/* Consciousness */}
          <PhilosophicalCard
            icon={<Brain size={24} />}
            title="Consciousness"
            content="Delving into the 'hard problem' of experience. We question how biological matter gives rise to the subjective feeling of being alive."
          />
          {/* Emotion */}
          <PhilosophicalCard
            icon={<Heart size={24} />}
            title="Emotion"
            content="Analyzing emotions not as mere impulses, but as high-level judgements of value and signals for deep-seated existential needs."
          />
          {/* Free Will */}
          <PhilosophicalCard
            icon={<Compass size={24} />}
            title="Free Will"
            content="Examining the tension between biological determinism and the capacity for conscious choice. Are we the authors of our own stories?"
          />
          {/* Meaning of Life */}
          <PhilosophicalCard
            icon={<Sparkles size={24} />}
            title="Meaning of Life"
            content="Moving beyond nihilism to discover how purpose can be constructed through connection, contribution, and intellectual mastery."
          />
          {/* Ethics */}
          <PhilosophicalCard
            icon={<Scale size={24} />}
            title="Ethics"
            content="A rigorous study of right and wrong, focusing on virtue ethics and the practical application of moral principles in a complex world."
          />
          {/* AI & Mind */}
          <PhilosophicalCard
            icon={<Cpu size={24} />}
            title="AI & Mind"
            content="Investigating the philosophical implications of artificial intelligence. Can a machine truly think, or only simulate thought?"
          />
          {/* Eastern Philosophy */}
          <PhilosophicalCard
            icon={<Sun size={24} />}
            title="Eastern Philosophy"
            content="Integrating the wisdom of the East—Taoism, Buddhism, and Vedanta—to find balance through mindfulness and non-attachment."
          />
          {/* Western Philosophy */}
          <PhilosophicalCard
            icon={<Moon size={24} />}
            title="Western Philosophy"
            content="Leveraging the analytical rigor of Western traditions, from the pre-Socratics to modern existentialists like Camus and Nietzsche."
          />
        </div>
      </div>

      {/* Closing Statement */}
      <div className="bg-black text-white p-12 rounded-[3.5rem] text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter relative z-10">
          Join the Circle
        </h3>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 font-medium relative z-10">
          Philosophy is not just an academic pursuit; it is a way of life. Begin
          your journey toward wisdom today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-2">
            Get Started <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PhilosophicalCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="group bg-white border border-black/10 p-8 rounded-[2rem] hover:border-black transition-all duration-300">
      <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h4 className="text-xl font-black mb-3 tracking-tight">{title}</h4>
      <p className="text-black/60 text-sm leading-relaxed font-medium">
        {content}
      </p>
    </div>
  );
}
