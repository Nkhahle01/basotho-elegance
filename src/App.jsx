import { useCallback, useState } from "react";
import EnvelopeReveal from "./components/EnvelopeReveal";
import AboutCelebrant from "./components/AboutCelebrant";
import DressCode from "./components/DressCode";
import RsvpSection from "./components/RsvpSection";
import ParticleCanvas from "./components/ParticleCanvas";

function App() {
  const [particleBurst, setParticleBurst] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleRevealStart = useCallback(() => {
    setParticleBurst(true);
    setIsEnvelopeOpen(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-visible bg-primary">
      <ParticleCanvas burstActive={particleBurst} />

      <main className="relative z-10 w-full overflow-visible">
        <EnvelopeReveal onRevealStart={handleRevealStart} />
      </main>

      <section
        className={
          isEnvelopeOpen
            ? "opacity-100 h-auto visible overflow-visible pointer-events-auto transition-all duration-1000"
            : "opacity-0 h-0 invisible overflow-hidden pointer-events-none transition-all duration-1000"
        }
      >
        <AboutCelebrant />
        <DressCode />
        <RsvpSection />
      </section>
    </div>
  );
}

export default App;
