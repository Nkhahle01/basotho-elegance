import { useCallback, useState } from "react";
import InvitationCard from "./InvitationCard";

const DEFAULT_CARD = <InvitationCard />;

function EnvelopeReveal({ onRevealStart, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    onRevealStart?.();
  }, [isOpen, onRevealStart]);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-visible py-20 px-4">
      <div
        className={`perspective-1000 relative mx-auto my-12 aspect-[4/3] w-full max-w-[560px] transition-all duration-700 ease-in-out ${
          isOpen
            ? "opacity-0 scale-95 pointer-events-none invisible absolute"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
      >
        {!isOpen && (
          <div className="absolute inset-x-0 -top-16 z-50 text-center">
            <button
              type="button"
              onClick={handleOpen}
              className="transform bg-gradient-to-r from-[#B89742] via-[#D4AF37] to-[#F3E5AB] px-10 py-4 font-sans text-xs font-bold tracking-[0.25em] text-[#0A2240] uppercase transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]"
            >
              Open Invitation
            </button>
          </div>
        )}

        <div className="relative h-full w-full shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] overflow-visible">
          {/* LAYER 1: BACK POCKET (Interior Cavity) */}
          <div className="absolute inset-0 z-10 overflow-hidden border border-[#D4AF37]/15 bg-[#051426]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] opacity-[0.03] [background-size:16px_16px]" />
          </div>

          {/* LAYER 3: FRONT JACKET */}
          <svg
            viewBox="0 0 500 375"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full drop-shadow-[0_-8px_15px_rgba(0,0,0,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0,375 L175,187.5 L0,0 Z" fill="#0A2240" opacity="0.99" />
            <path
              d="M500,375 L325,187.5 L500,0 Z"
              fill="#0A2240"
              opacity="0.99"
            />
            <path d="M0,375 L250,165 L500,375 Z" fill="#0d294d" />

            <path
              d="M0,375 L250,165 L500,375"
              stroke="#D4AF37"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <path
              d="M15,375 L250,180 L485,375"
              stroke="#D4AF37"
              strokeWidth="0.5"
              opacity="0.2"
              strokeDasharray="4 4"
            />
            <path
              d="M35,375 L250,190 L465,375"
              stroke="#D4AF37"
              strokeWidth="0.75"
              opacity="0.15"
            />

            <path
              d="M175,187.5 L250,165 L325,187.5"
              stroke="#D4AF37"
              strokeWidth="1"
              opacity="0.35"
            />
            <path
              d="M190,187.5 L250,172 L310,187.5"
              stroke="#D4AF37"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </svg>

          {/* LAYER 4: TOP FLAP — Litema engravings + Mokorotlo seal */}
          <div
            className={`absolute inset-x-0 top-0 z-40 h-[62%] origin-top transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] ${
              isOpen
                ? "envelope-top-flap-open pointer-events-none"
                : "envelope-top-flap-closed"
            }`}
          >
            <button
              type="button"
              onClick={handleOpen}
              disabled={isOpen}
              aria-label="Open invitation envelope"
              className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            />

            <svg
              viewBox="0 0 500 235"
              className="pointer-events-none h-full w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="litemaGoldGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#B89742" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#F3E5AB" />
                  <stop offset="100%" stopColor="#B89742" />
                </linearGradient>
              </defs>

              <path d="M0,0 L250,235 L500,0 Z" fill="#0A2240" />

              {/* Outer framing accents — 2px to 0.5px gold stroke hierarchy */}
              <path d="M0,0 L250,235 L500,0" stroke="#D4AF37" strokeWidth="2" />
              <path
                d="M12,0 L250,218 L488,0"
                stroke="#D4AF37"
                strokeWidth="0.75"
                opacity="0.6"
              />
              <path
                d="M24,0 L250,205 L476,0"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.35"
              />

              {/* Nested structural chevrons */}
              <path
                d="M250,18 L268,36 L250,54 L232,36 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.45"
              />
              <path
                d="M250,32 L262,44 L250,56 L238,44 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M250,46 L256,52 L250,58 L244,52 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.2"
              />

              {/* Left geometric matrix */}
              <path
                d="M40,0 L145,105 M60,0 L145,85 M80,0 L145,65 M100,0 L145,45"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M145,35 L145,115 L65,35 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.25"
              />
              <path
                d="M55,15 L125,85 L55,85 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.18"
              />

              {/* Right geometric matrix */}
              <path
                d="M460,0 L355,105 M440,0 L355,85 M420,0 L355,65 M400,0 L355,45"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M355,35 L355,115 L435,35 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.25"
              />
              <path
                d="M445,15 L375,85 L445,85 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.18"
              />

              {/* Center focal diamond pattern */}
              <path
                d="M250,85 L285,120 L250,155 L215,120 Z"
                stroke="#D4AF37"
                strokeWidth="1"
                opacity="0.7"
              />
              <path
                d="M250,95 L275,120 L250,145 L225,120 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.4"
                strokeDasharray="2 2"
              />
              <path
                d="M250,102 L268,120 L250,138 L232,120 Z"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.25"
              />

              {/* Mokorotlo seal — gold gradient crest */}
              <g transform="translate(230, 200)">
                <circle cx="20" cy="20" r="16" fill="url(#litemaGoldGrad)" />
                <circle
                  cx="20"
                  cy="20"
                  r="13"
                  fill="none"
                  stroke="#B89742"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                <path
                  d="M20,9 L27,17 L25,19 L29,27 L11,27 L15,19 L13,17 Z"
                  fill="#0A2240"
                />
                <path
                  d="M11,29 L29,29"
                  stroke="#0A2240"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div
        className={`relative w-full flex items-center justify-center transition-all duration-700 ease-out ${
          isOpen
            ? "opacity-100 scale-100 relative pointer-events-auto delay-100"
            : "opacity-0 scale-95 absolute pointer-events-none"
        }`}
      >
        {children ?? DEFAULT_CARD}
      </div>
    </div>
  );
}

export default EnvelopeReveal;
export { EnvelopeReveal };
