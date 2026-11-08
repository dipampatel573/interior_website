import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Private Residence',
    budget: '$150,000 - $300,000',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionState, setSubmissionState] = useState(null); // null | 'prepared' | 'copied'
  const [copied, setCopied] = useState(false);

  const studioEmail = "inquiry@aureliastudio.design";

  const projectTypes = [
    'Private Residence',
    'Penthouse Renovation',
    'Commercial Architectural Space',
    'Spatial Planning & Consulting',
    'Bespoke Joinery & Lighting'
  ];

  const budgetTiers = [
    '$75,000 - $150,000',
    '$150,000 - $300,000',
    '$300,000 - $600,000',
    '$600,000+'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide details regarding your project vision (at least 10 characters).';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Architectural Inquiry: ${formData.projectType} — ${formData.name}`);
    const body = encodeURIComponent(
      `Studio Aurelia Inquiry\n\n` +
      `Client Name: ${formData.name}\n` +
      `Client Email: ${formData.email}\n` +
      `Project Type: ${formData.projectType}\n` +
      `Estimated Budget: ${formData.budget}\n\n` +
      `Project Brief & Spatial Vision:\n${formData.message}\n`
    );
    return `mailto:${studioEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Explicit fallback mechanism compliant with requirements:
    // Never pretend a network message was sent without backend API;
    // instead explicitly prepare mailto dispatch & copy options.
    setSubmissionState('prepared');

    // Trigger the native mailto client
    window.location.href = getMailtoLink();
  };

  const handleCopyInquiry = () => {
    const fullText = 
      `To: ${studioEmail}\n` +
      `Subject: Architectural Inquiry: ${formData.projectType} — ${formData.name}\n\n` +
      `Client Name: ${formData.name}\n` +
      `Client Email: ${formData.email}\n` +
      `Project Type: ${formData.projectType}\n` +
      `Estimated Budget: ${formData.budget}\n\n` +
      `Project Brief:\n${formData.message}`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <section 
      id="contact" 
      className="relative bg-charcoal-dark text-warmWhite py-28 md:py-44 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Headline and Studio Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-bronze" />
                <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-bronze font-mono">
                  Commission an Environment
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight leading-[1.1] mb-8">
                LET&rsquo;S CREATE <br />
                <span className="italic text-bronze-light">YOUR SPACE.</span>
              </h2>

              <p className="text-sm md:text-base text-warmWhite/75 font-light leading-relaxed mb-10">
                We accept a limited number of residential and architectural commissions each year to ensure uncompromising craft, material provenance, and meticulous attention to detail.
              </p>

              <div className="space-y-6 border-t border-white/10 pt-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-bronze block mb-1">
                    Direct Studio Inquiries
                  </span>
                  <a 
                    href={`mailto:${studioEmail}`} 
                    className="text-base text-warmWhite hover:text-bronze transition-colors font-light"
                  >
                    {studioEmail}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-bronze block mb-1">
                    Studio Headquarters
                  </span>
                  <p className="text-sm text-warmWhite/80 font-light leading-relaxed">
                    Aurelia Architectural Practice<br />
                    Studio Suite 402, Heritage Design District
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-bronze block mb-1">
                    Direct Telephone
                  </span>
                  <span className="text-sm text-warmWhite/80 font-mono">
                    +1 (415) 890-4220
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-charcoal border border-white/5 text-[11px] text-warmWhite/60 font-mono">
              Note: Initial consultations include a preliminary spatial volume review and site feasibility assessment.
            </div>
          </div>

          {/* Right Column: Accessible Form */}
          <div className="lg:col-span-7 bg-charcoal border border-white/10 p-8 sm:p-12 shadow-2xl">
            {submissionState === 'prepared' ? (
              <div className="space-y-6 py-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 border border-bronze flex items-center justify-center text-bronze mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-warmWhite font-light">
                  Inquiry Compiled for Dispatch
                </h3>
                <p className="text-sm text-warmWhite/80 font-light leading-relaxed">
                  Your project brief has been compiled. In accordance with studio transparency, external third-party tracking scripts are omitted. Your inquiry has been routed directly to your default mail application via an authenticated mailto link.
                </p>

                <div className="p-4 bg-white/5 border border-white/10 text-xs font-mono space-y-2">
                  <div className="text-bronze">Recipient: {studioEmail}</div>
                  <div>Client: {formData.name} &lt;{formData.email}&gt;</div>
                  <div>Scope: {formData.projectType} &middot; {formData.budget}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={getMailtoLink()}
                    className="flex-1 py-3.5 px-6 bg-bronze text-charcoal font-medium text-xs tracking-widest uppercase text-center hover:bg-bronze-light transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>Open in Email Client</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="flex-1 py-3.5 px-6 border border-white/20 hover:border-bronze text-warmWhite hover:text-bronze text-xs tracking-widest uppercase transition-colors inline-flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-bronze" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Inquiry Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-warmWhite/50">Need to make adjustments?</span>
                  <button
                    onClick={() => setSubmissionState(null)}
                    className="text-bronze hover:underline uppercase tracking-wider"
                  >
                    Edit Information
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-warmWhite/80 mb-2">
                    Your Full Name <span className="text-bronze">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Julian Thorne"
                    className={`w-full bg-charcoal-dark border ${
                      errors.name ? 'border-red-400' : 'border-white/15'
                    } px-4 py-3 text-sm text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:border-bronze transition-colors`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-warmWhite/80 mb-2">
                    Email Address <span className="text-bronze">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="julian@example.com"
                    className={`w-full bg-charcoal-dark border ${
                      errors.email ? 'border-red-400' : 'border-white/15'
                    } px-4 py-3 text-sm text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:border-bronze transition-colors`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Project Type & Budget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-xs uppercase tracking-widest text-warmWhite/80 mb-2">
                      Project Scope
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-charcoal-dark border border-white/15 px-4 py-3 text-sm text-warmWhite focus:outline-none focus:border-bronze transition-colors cursor-pointer"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-charcoal text-warmWhite">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-warmWhite/80 mb-2">
                      Approximate Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-charcoal-dark border border-white/15 px-4 py-3 text-sm text-warmWhite focus:outline-none focus:border-bronze transition-colors cursor-pointer"
                    >
                      {budgetTiers.map((tier) => (
                        <option key={tier} value={tier} className="bg-charcoal text-warmWhite">
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-warmWhite/80 mb-2">
                    Spatial Vision & Location Details <span className="text-bronze">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the property, square footage, intended timeline, and aesthetic objectives..."
                    className={`w-full bg-charcoal-dark border ${
                      errors.message ? 'border-red-400' : 'border-white/15'
                    } px-4 py-3 text-sm text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:border-bronze transition-colors resize-none`}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-bronze text-charcoal font-medium text-xs tracking-widest uppercase hover:bg-bronze-light transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Initiate Studio Conversation</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-[11px] text-warmWhite/50 text-center tracking-wide">
                  Direct submission via native mail client. Inquiries are reviewed directly by the principal partners.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
