import { memo } from "react";

const DressCode = memo(function DressCode() {
  return (
    <section className="mx-auto w-full max-w-3xl border-t border-[#D4AF37]/20 pt-12 pb-8">
      <div className="space-y-8">
        <h2 className="font-serif text-3xl font-light text-[#D4AF37] md:text-4xl">
          Dress Code
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#0F1E30]/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(212,175,55,0.15)]">
            <div className="overflow-hidden border border-[#D4AF37]">
              <img
                src="/All black Semi.jpeg"
                alt="Gentlemen All Black Attire"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="px-6 py-6 text-center md:px-8 md:py-8">
              <h3 className="font-serif text-2xl font-light text-[#D4AF37] md:text-3xl">
                Gentlemen
              </h3>
              <p className="mt-3 font-sans text-lg text-accent/95 tracking-[0.12em] md:text-xl">
                All Black Male
              </p>
              <p className="mt-2 text-sm text-accent/70 leading-relaxed md:text-base">
                Semi-Formal
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#0F1E30]/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(212,175,55,0.15)]">
            <div className="overflow-hidden border border-[#D4AF37]">
              <img
                src="/basotho-fabric.jpg"
                alt="Traditional Basotho Fabric"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="px-6 py-6 text-center md:px-8 md:py-8">
              <h3 className="font-serif text-2xl font-light text-[#D4AF37] md:text-3xl">
                Ladies
              </h3>
              <p className="mt-3 font-sans text-lg text-accent/95 tracking-[0.12em] md:text-xl">
                Traditional Basotho Elegance
              </p>
              <p className="mt-2 text-sm text-accent/70 leading-relaxed md:text-base">
                (Traditional Fabric Details to be Formally Confirmed)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20 pt-6">
          <p className="font-sans text-sm text-accent/60 text-center md:text-base">
            For any dress code inquiries, please contact the organizers
            directly.
          </p>
        </div>
      </div>
    </section>
  );
});

DressCode.displayName = "DressCode";

export default DressCode;
export { DressCode };
