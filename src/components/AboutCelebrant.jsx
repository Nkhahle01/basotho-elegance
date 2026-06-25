import { memo } from "react";

const AboutCelebrant = memo(function AboutCelebrant() {
  return (
    <section className="mx-auto w-full max-w-3xl border-t border-[#D4AF37]/20 pt-12">
      <div className="space-y-6">
        <h2 className="font-serif text-3xl font-light text-[#D4AF37] md:text-4xl">
          About the Celebrant
        </h2>

        <article className="space-y-6 font-sans text-base leading-relaxed text-accent/90 md:text-lg md:leading-relaxed">
          <p className="flex gap-3">
            <span className="float-left font-serif text-8xl font-light leading-none text-[#D4AF37] md:text-9xl">
              F
            </span>
            <span className="pt-2">
              ifty years of a remarkable life journey—marked by unwavering
              leadership, profound integrity, and an enduring legacy that has
              touched countless lives. Mr. Keketso Makara stands as a beacon of
              excellence, a visionary whose contributions have shaped
              communities and inspired generations.
            </span>
          </p>

          <p>
            This milestone celebration honors not merely a birthday, but a life
            of substance and meaning. It is a moment to reflect on the wisdom
            gained, the bonds forged, and the indelible mark left upon those
            fortunate enough to know him. As he enters this new chapter, we
            gather to express our deepest gratitude for his guidance, his
            warmth, and his unwavering commitment to excellence.
          </p>

          <p>
            Join us in celebrating a half-century of distinguished achievement,
            cherished relationships, and the promise of many more years filled
            with joy, purpose, and continued influence.
          </p>
        </article>
      </div>
    </section>
  );
});

AboutCelebrant.displayName = "AboutCelebrant";

export default AboutCelebrant;
export { AboutCelebrant };
