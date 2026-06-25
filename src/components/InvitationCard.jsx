import { memo } from "react";

const InvitationCard = memo(function InvitationCard() {
  return (
    <div className="mx-auto w-[92vw] sm:w-[460px] h-auto min-h-[550px] p-6 md:p-8 flex flex-col justify-between rounded-2xl border border-[#D4AF37] bg-[#162E4E] text-center text-[#FDFBF7] shadow-2xl relative z-10">
      <div className="flex flex-col justify-between gap-8">
        <div className="mx-auto flex justify-center items-center w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#D4AF37] mb-6 shadow-lg">
          <img
            src="/celebrant-placeholder.jpg"
            alt="Keketso Makara"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 px-2 md:px-0">
          <h1
            className="text-3xl font-medium leading-tight tracking-tight text-[#D4AF37] md:text-4xl lg:text-5xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            You are invited to Keketso Makara's birthday event
          </h1>

          <div className="mx-auto mt-2 mb-3 h-px w-24 bg-gradient-to-r from-[#D4AF37]/80 via-[#D4AF37]/40 to-transparent" />

          <div className="mt-2 space-y-1 text-sm md:text-base leading-relaxed text-[#FDFBF7]">
            <p className="text-[#D4AF37] font-semibold">
              Saturday, 31 October 2026
            </p>
            <p className="text-[#FDFBF7]/90">
              Lerotholi Polytechnic II Campus, Matsieng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

InvitationCard.displayName = "InvitationCard";

export default InvitationCard;
export { InvitationCard };
