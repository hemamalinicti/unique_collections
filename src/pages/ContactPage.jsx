import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Send, Check, Clock, ChevronDown } from "lucide-react";

export const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Retail Enquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSent(false);
    }, 4000);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Hello UNIQUE Collections, I would like to enquire about:\n- Name: ${name || "Guest"}\n- Topic: ${subject}\n- Message: ${message || "General enquiry"}`
    );
    window.open(`https://wa.me/917598723245?text=${text}`, "_blank");
  };

  const faqs = [
    {
      q: "What is your minimum order quantity for wholesale pricing?",
      a: "Our starter wholesale tier begins at just 20 pieces. You are welcome to mix and match sizes and colors across our shirt and trouser styles."
    },
    {
      q: "How does complimentary shipping work for retail orders?",
      a: "All domestic retail orders above ₹999 qualify automatically for complimentary express delivery across India. Orders below this threshold carry a flat standard shipping fee of ₹149."
    },
    {
      q: "Do you offer custom brand labeling for corporate or boutique clients?",
      a: "Yes! For orders of 50 units and above, our factory offers custom private woven tags, custom packaging, and institutional embroidery."
    },
    {
      q: "What is your return or exchange policy for garment sizing?",
      a: "We offer a 7-day hassle-free fit exchange guarantee. If your collar or trouser waist requires a different size, our WhatsApp concierge will coordinate immediate replacement."
    }
  ];

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D6B77A]/30">
          <Link to="/" className="hover:text-[#2B211B]">Home</Link>
          <span>/</span>
          <span className="text-[#2B211B] font-semibold">Contact Us</span>
        </div>

        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase font-bold tracking-widest text-[#2B211B] mb-1">
            Concierge & Inquiries
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B211B]">
            Get In Touch With UNIQUE Collections
          </h1>
          <p className="text-sm text-[#2B211B] mt-2">
            Whether you require personal styling advice, assistance with collar sizing, or custom institutional bulk supply, our team is at your disposal.
          </p>
        </div>

        {/* 2-Column Grid: Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-[#FAF4E9] p-6 sm:p-8 rounded-3xl border border-[#D6B77A]/40 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-[#2B211B] mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#2B211B] mb-6">
              Fill out the form below and our customer desk will respond within 2-4 business hours.
            </p>

            {sent ? (
              <div className="p-6 bg-[#1B5E20]/10 border border-[#1B5E20]/30 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1B5E20] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1B5E20]">
                  Thank You, Message Received!
                </h4>
                <p className="text-xs text-[#2B211B]">
                  We have registered your inquiry and a specialist will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A] cursor-pointer"
                    >
                      <option value="Retail Order Enquiry">Retail Order Enquiry</option>
                      <option value="Wholesale / Bulk Orders">Wholesale / Bulk Orders</option>
                      <option value="Collar & Fit Sizing Help">Collar & Fit Sizing Help</option>
                      <option value="Corporate Gifting / Custom Labeling">Corporate Gifting / Custom Labeling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your requirements or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#D6B77A]" />
                    <span>Send Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppChat}
                    className="py-3 px-5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Instant WhatsApp Connect</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Direct Card */}
            <div className="p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1B5E20]">
                Direct WhatsApp Sales Desk
              </h3>
              <p className="text-xs text-[#1B5E20]/90 leading-relaxed">
                Connect immediately with our head of menswear tailoring. Send garment photos, ask fit queries, or place rapid bulk re-orders.
              </p>
              <a
                href="https://wa.me/917598723245?text=Hello%20UNIQUE%20Collections,%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1B5E20] underline underline-offset-4"
              >
                <span>+91 98765 43210 (Click to Open Chat)</span>
              </a>
            </div>

            {/* Email & Info Card */}
            <div className="p-6 rounded-3xl bg-[#FAF4E9] border border-[#D6B77A]/40 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D6B77A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B211B] block">
                    Official Email
                  </span>
                  <a
                    href="mailto:concierge@uniquecollections.com"
                    className="font-bold text-xs sm:text-sm text-[#2B211B] hover:text-[#D6B77A]"
                  >
                    concierge@uniquecollections.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#D6B77A]/30">
                <MapPin className="w-5 h-5 text-[#D6B77A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B211B] block">
                    Studios & Facilities
                  </span>
                  <p className="text-xs text-[#2B211B]">
                    UNIQUE Collections Tailoring Studio, Lower Parel, Mumbai<br />
                    Textile & Logistics Center, Surat, Gujarat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#D6B77A]/30">
                <Clock className="w-5 h-5 text-[#D6B77A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B211B] block">
                    Concierge Hours
                  </span>
                  <p className="text-xs text-[#2B211B]">
                    Monday – Saturday: 9:30 AM – 7:30 PM IST<br />
                    Sunday: 10:00 AM – 4:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#D6B77A]/30 pt-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#2B211B]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#2B211B] mt-1">
              Quick answers regarding retail delivery, fabric care, and bulk orders.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#2B211B] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D6B77A] transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#2B211B] leading-relaxed border-t border-[#D6B77A]/20 pt-2 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
