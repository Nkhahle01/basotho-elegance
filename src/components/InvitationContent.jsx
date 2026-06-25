import { memo } from "react";

/**
 * InvitationContent
 * Three-section invitation layout:
 * 1. Core invitation card with portrait & event details
 * 2. About the celebrant editorial section
 * 3. Dress code guidance (responsive two-column)
 */
const InvitationContent = memo(function InvitationContent() {
  return (
    <div className="w-full space-y-12 px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-12">
      {/* SECTION 1: INVITATION CARD CORE */}
      <section className="mx-auto w-full max-w-2xl space-y-8">
        {/* Portrait with Double Gold Frame */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xs">
            {/* Outer frame - thin gold border */}
            <div className="border border-[#D4AF37] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]">
              {/* Inner frame - double line effect with gap */}
              <div className="border border-[#D4AF37]/70 p-4">
                {/* Portrait image */}
                <img
                  src="/celebrant-placeholder.jpg"
                  alt="Mr. Keketso Makara"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Details - Premium Typography */}
        <div className="space-y-6 text-center">
          {/* Name - Large Display */}
          <h1 className="font-serif text-5xl font-light tracking-wide text-[#D4AF37] md:text-6xl lg:text-7xl">
            Keketso Makara
          </h1>

          {/* Celebration Title */}
          <p className="font-serif text-2xl font-light text-accent/90 md:text-3xl">
            50th Birthday Celebration
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-px w-8 bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
            <div className="h-1 w-1 bg-[#D4AF37]/50 rounded-full" />
            <div className="h-px w-8 bg-gradient-to-l from-[#D4AF37]/30 to-transparent" />
          </div>

          {/* Date */}
          <p className="font-sans text-lg tracking-wide text-accent md:text-xl">
            Saturday, 31 October 2026
          </p>

          {/* Venue */}
          <p className="font-sans text-base leading-relaxed text-accent/85 md:text-lg">
            Lerotholi Polytechnic II Campus
            <br />
            Matsieng
          </p>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE CELEBRANT */}
      <section className="mx-auto w-full max-w-3xl border-t border-[#D4AF37]/30 pt-12">
        <div className="space-y-6">
          {/* Section title */}
          <h2 className="font-serif text-3xl font-light text-[#D4AF37] md:text-4xl">
            About the Celebrant
          </h2>

          {/* Editorial layout with drop-cap */}
          <article className="space-y-6 font-sans text-base leading-relaxed text-accent/90 md:text-lg md:leading-relaxed">
            {/* First paragraph with drop-cap */}
            <p className="flex gap-3">
              <span className="float-left font-serif text-8xl font-light leading-none text-[#D4AF37] md:text-9xl">
                F
              </span>
              <span className="pt-2">
                fifty years of a remarkable life journey—marked by unwavering
                leadership, profound integrity, and an enduring legacy that has
                touched countless lives. Mr. Keketso Makara stands as a beacon
                of excellence, a visionary whose contributions have shaped
                communities and inspired generations. From his earliest
                endeavors to his most celebrated achievements, his path has been
                one of continuous growth, compassionate stewardship, and
                distinguished service.
              </span>
            </p>

            {/* Additional narrative paragraphs */}
            <p>
              This milestone celebration honors not merely a birthday, but a
              life of substance and meaning. It is a moment to reflect on the
              wisdom gained, the bonds forged, and the indelible mark left upon
              those fortunate enough to know him. As he enters this new chapter,
              we gather to express our deepest gratitude for his guidance, his
              warmth, and his unwavering commitment to excellence in all
              endeavors.
            </p>

            <p>
              Join us in celebrating a half-century of distinguished
              achievement, cherished relationships, and the promise of many more
              years filled with joy, purpose, and continued influence.
            </p>
          </article>
        </div>
      </section>

      {/* SECTION 3: DRESS CODE GUIDANCE */}
      <section className="mx-auto w-full max-w-3xl border-t border-[#D4AF37]/30 pt-12 pb-8">
        <div className="space-y-8">
          {/* Section title */}
          <h2 className="font-serif text-3xl font-light text-[#D4AF37] md:text-4xl">
            Dress Code
          </h2>

          {/* Two-column grid: responsive */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* GENTLEMEN CARD */}
            <div className="group relative flex flex-col overflow-hidden bg-[#0F1E30] p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(212,175,55,0.15)]">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent" />

              {/* Minimal geometric accent */}
              <div className="absolute top-6 right-6 h-8 w-8 border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-colors duration-500" />

              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-light text-[#D4AF37] md:text-3xl">
                  Gentlemen
                </h3>
                <p className="font-sans text-lg text-accent/95 tracking-wide">
                  All Black Semi-Formal
                </p>
                <p className="font-sans text-sm text-accent/70 leading-relaxed">
                  Classic elegance in monochromatic sophistication. Black tie or
                  equivalent formal business attire.
                </p>
              </div>
            </div>

            {/* LADIES CARD */}
            <div className="group relative flex flex-col overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0F1E30] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(212,175,55,0.15)]">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent" />

              {/* Image container with gold border */}
              <div className="relative h-48 w-full border-b-2 border-[#D4AF37]/60 overflow-hidden bg-[#051426] md:h-56">
                <img
                  src="/basotho-fabric.jpg"
                  alt="Traditional Basotho Fabric"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051426] via-transparent to-transparent" />
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-between gap-4 p-8 md:p-10 flex-1">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-light text-[#D4AF37] md:text-3xl">
                    Ladies
                  </h3>
                  <p className="font-sans text-lg text-accent/95 tracking-wide">
                    Traditional Basotho Elegance
                  </p>
                </div>
                <p className="font-sans text-sm text-accent/70 leading-relaxed">
                  Traditional Fabric Details to be Formally Confirmed
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-[#D4AF37]/20 pt-6">
            <p className="font-sans text-sm text-accent/60 text-center md:text-base">
              For any dress code inquiries, please contact the organizers
              directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

InvitationContent.displayName = "InvitationContent";

export default InvitationContent;
