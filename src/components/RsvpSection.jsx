import { memo, useEffect, useState } from "react";
import supabase from "../supabaseClient";

const RsvpSection = memo(function RsvpSection() {
  const [title, setTitle] = useState("Mr");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [attending, setAttending] = useState(false);
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("memory_wall")
      .select("id, created_at, guest_name, message")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching memory wall messages:", error);
      return;
    }

    setMessages(data ?? []);
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "memory_wall" },
        (payload) => {
          setMessages((prev) => [payload.new, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fullName.trim() || !phoneNumber.trim()) {
      alert(
        "Please enter both your full name and phone number before submitting.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      if (!supabase) {
        throw new Error("Supabase client is not configured.");
      }

      const { data, error: supabaseError } = await supabase
        .from("rsvps")
        .insert([
          {
            full_name: fullName,
            phone_number: phoneNumber,
            attending,
          },
        ]);

      if (supabaseError) {
        console.error("Supabase insert error:", supabaseError);
        alert(
          `Error submitting RSVP: ${supabaseError.message ?? JSON.stringify(supabaseError)}`,
        );
        throw supabaseError;
      }

      setSubmissionSuccess(true);
      setFullName("");
      setPhoneNumber("");
      setAttending(false);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    try {
      const { data, error } = await supabase.from("memory_wall").insert([
        {
          guest_name: guestName,
          message: guestMessage,
        },
      ]);

      if (error) {
        console.error("Memory Wall Database Rejection:", error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      setGuestName("");
      setGuestMessage("");
    } catch (err) {
      console.error("Failed to post message:", err);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl border-t border-[#D4AF37]/20 pt-12 pb-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="font-serif text-3xl font-light text-[#D4AF37] md:text-4xl">
            RSVP & Memory Wall
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-sm text-accent/70 md:text-base">
            Please confirm your attendance and leave a short note for the
            celebrant.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6 rounded-3xl border border-[#D4AF37]/20 bg-[#0A2240]/90 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            {submissionSuccess ? (
              <div className="space-y-6 rounded-3xl border border-[#D4AF37] bg-[#081A2F]/95 p-8 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <p className="font-serif text-3xl font-medium text-[#D4AF37]">
                  RSVP Confirmed
                </p>
                <p className="mx-auto max-w-xl font-sans text-sm text-accent/70 md:text-base">
                  Thank you for locking in your seat for the October 31, 2026
                  event. We look forward to celebrating with you in Basotho
                  elegance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block pb-2 text-sm font-medium text-accent/80"
                  >
                    Title
                  </label>
                  <select
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-2xl border border-[#D4AF37]/15 bg-[#041223] px-4 py-3 text-accent outline-none"
                  >
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                    <option>Dr</option>
                    <option>Prof</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block pb-2 text-sm font-medium text-accent/80"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-[#D4AF37]/15 bg-[#041223] px-4 py-3 text-accent outline-none"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block pb-2 text-sm font-medium text-accent/80"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    placeholder="e.g. +266 5xx xxx xxx"
                    className="w-full rounded-2xl border border-[#D4AF37]/15 bg-[#041223] px-4 py-3 text-accent outline-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="attending"
                    type="checkbox"
                    checked={attending}
                    onChange={(e) => setAttending(e.target.checked)}
                    className="h-5 w-5 rounded border border-[#D4AF37]/40 bg-[#041223] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="attending" className="text-sm text-accent/80">
                    I will be attending the event
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block pb-2 text-sm font-medium text-accent/80"
                  >
                    Message for the celebrant (optional)
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Short note or memory"
                    className="w-full rounded-2xl border border-[#D4AF37]/15 bg-[#041223] px-4 py-3 text-accent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-gradient-to-r from-[#B89742] via-[#D4AF37] to-[#F3E5AB] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A2240] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send RSVP"}
                </button>
              </form>
            )}
          </div>

          <aside className="rounded-3xl border border-[#D4AF37]/20 bg-[#081A2F]/95 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]/80">
                Memory Wall
              </p>

              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="guestName"
                    className="block pb-2 text-sm font-medium text-accent/80"
                  >
                    Guest Name
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-[#D4AF37]/15 bg-[#041223] px-4 py-3 text-accent outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guestMessage"
                    className="block pb-2 text-sm font-medium text-accent/80"
                  >
                    Message for Ntate Keketso
                  </label>
                  <textarea
                    id="guestMessage"
                    rows="3"
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Write a congratulations note"
                    className="w-full rounded-2xl border border-[#D4AF37]/15 bg-[#041223] px-4 py-3 text-accent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-[#B89742] via-[#D4AF37] to-[#F3E5AB] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A2240] transition hover:brightness-110"
                >
                  Leave a memory
                </button>
              </form>

              <div className="space-y-3 max-h-[40vh] overflow-auto">
                {messages.length === 0 && (
                  <p className="text-sm text-accent/70">
                    Be the first to leave a congratulatory message!
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {messages.map((note) => (
                    <article
                      key={note.id}
                      className="rounded-3xl border border-[#D4AF37]/20 bg-[#081A2F]/95 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
                    >
                      <p className="font-serif text-sm font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                        {note.guest_name ||
                          note.name ||
                          note.full_name ||
                          "Guest"}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-accent/80">
                        {note.message || note.note || note.body || "—"}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
});

RsvpSection.displayName = "RsvpSection";

export default RsvpSection;
export { RsvpSection };
