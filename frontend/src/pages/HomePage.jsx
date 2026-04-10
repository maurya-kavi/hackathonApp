import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

/* ─── Animated Counter Hook ─────────────────────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Intersection Observer Hook ────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Data ───────────────────────────────────────────────────── */
const stats = [
  { label: 'Active Members', value: 10000, suffix: '+', icon: '👥' },
  { label: 'Sessions Completed', value: 45000, suffix: '+', icon: '✅' },
  { label: 'Regional Languages', value: 12, suffix: '', icon: '🌐' },
  { label: 'Documents Decoded', value: 32000, suffix: '+', icon: '📄' },
];

const steps = [
  {
    step: '01',
    title: 'Upload or Search',
    desc: 'Find your specific government procedure by name or upload a document directly — passport form, tax notice, land registration — any of it.',
    icon: '🔍',
    color: 'from-violet-500 to-purple-600',
  },
  {
    step: '02',
    title: 'Get the Blueprint',
    desc: 'Receive a clear, visual step-by-step decision tree of the exact actions you need to take, explained in plain language.',
    icon: '🗺️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: '03',
    title: 'Gather & Submit',
    desc: 'See a smart checklist of required documents, the exact government portal link, and the specific office you need to visit.',
    icon: '📋',
    color: 'from-pink-500 to-rose-500',
  },
];

const useCases = [
  { icon: '🏠', title: 'Property Registration', desc: 'Land records, title deeds, mutation & encumbrance certificates made simple.' },
  { icon: '📊', title: 'Tax Notices & Compliance', desc: 'GST, income tax, property tax notices decoded with required actions.' },
  { icon: '✈️', title: 'Visa, Passport & Immigration', desc: 'End-to-end guidance for travel documents and immigration forms.' },
  { icon: '🏢', title: 'Business Licenses & Permits', desc: 'Start your MSME, shop license, FSSAI, or trade license without confusion.' },
  { icon: '🎓', title: 'Education & Scholarships', desc: 'Government scholarship applications, certificate verification and more.' },
  { icon: '⚖️', title: 'Legal Notices & RTI', desc: 'Respond to legal notices and file Right to Information requests confidently.' },
];

const testimonials = [
  {
    quote: "I was terrified of my land mutation notice. CitizenBridge gave me a 5-step checklist, told me exactly which tahsildar office to go to, and I was done in 2 days instead of months.",
    name: 'Ravi Kumar',
    location: 'Farmer, Telangana',
    avatar: 'RK',
    color: 'from-violet-400 to-purple-500',
  },
  {
    quote: "My GST notice looked like it was written in code. The platform translated it into Hindi and showed me exactly what to file. My accountant was shocked I figured it out myself!",
    name: 'Meena Sharma',
    location: 'Small Business Owner, Rajasthan',
    avatar: 'MS',
    color: 'from-pink-400 to-rose-500',
  },
  {
    quote: "Passport renewal used to mean at least 4 trips to the office. With CitizenBridge, I knew exactly which documents to bring and which form fields to fill. One trip. Done.",
    name: 'Arjun Nair',
    location: 'Software Engineer, Kerala',
    avatar: 'AN',
    color: 'from-emerald-400 to-teal-500',
  },
];

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ icon, label, value, suffix, animate }) {
  const count = useCounter(value, 2200, animate);
  return (
    <div className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-lg shadow-purple-100 border border-purple-100 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1 transition-all duration-300">
      <span className="text-4xl mb-2">{icon}</span>
      <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-slate-500 mt-1 font-medium">{label}</span>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function HomePage() {
  const [statsRef, statsInView] = useInView(0.3);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // future: navigate to search results
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50/30 to-white font-sans">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════ */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Decorative background blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-purple-100/20 to-transparent blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping inline-block" />
            AI-Powered · 12 Regional Languages · Free to Use
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-800 leading-tight tracking-tight mb-6">
            Government Procedures,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500">
              Decoded for You.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed">
            Upload any complex legal notice or government form. We translate it into simple,
            step-by-step instructions — in your language, in minutes.
          </p>

          {/* Search CTA */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="hero-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a procedure (e.g. 'property registration')"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-purple-200 bg-white shadow-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base transition"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-xl hover:shadow-purple-300 hover:scale-105 transition-all duration-200 text-base whitespace-nowrap"
            >
              Search Procedure
            </button>
          </form>

          {/* Upload CTA */}
          <p className="text-slate-400 text-sm">
            Or{' '}
            <label htmlFor="doc-upload" className="text-purple-600 font-semibold cursor-pointer hover:underline">
              upload a document
            </label>
            {' '}to get instant guidance
            <input id="doc-upload" type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
          </p>

          {/* Floating badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm">
            {['🔒 100% Secure', '🌐 Multilingual', '📱 Mobile Friendly', '⚡ Instant Results', '🆓 Free Forever'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-white border border-purple-100 text-slate-600 shadow-sm font-medium hover:border-purple-300 hover:shadow-md transition">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          IMPACT METRICS
      ══════════════════════════════════════════════════════════ */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="py-20 px-4" 
        ref={statsRef}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
              Trusted by Citizens Across India
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">Real impact. Real people. Real results.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} animate={statsInView} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.7 }} 
        className="py-20 px-4 bg-gradient-to-br from-purple-700 to-violet-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 border border-white/20">
              The Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              How CitizenBridge Works
            </h2>
            <p className="text-purple-200 max-w-xl mx-auto">
              Three simple steps. No legal jargon. No running between offices.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="relative group p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 border-t-2 border-dashed border-white/30 z-10" />
                )}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {s.icon}
                </div>
                <span className="text-5xl font-black text-white/10 absolute top-4 right-6 select-none">{s.step}</span>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-purple-200 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          USE CASES
      ══════════════════════════════════════════════════════════ */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ staggerChildren: 0.1, duration: 0.6 }} 
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              What We Cover
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
              Every Procedure, Simplified
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From taxes to travel docs — we've got the blueprint for all of it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="group p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-lg hover:shadow-purple-100 hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {uc.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{uc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{uc.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-purple-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Explore <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <motion.section 
        initial={{ opacity: 0, x: -30 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="py-20 px-4 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
              Voices of the People
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Real citizens who navigated government procedures without stress.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>

                <div className="flex items-center gap-3 mt-6">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5, type: "spring" }} 
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 p-12 shadow-2xl shadow-purple-200 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-pink-400/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Stop Guessing. Start Knowing.
            </h2>
            <p className="text-purple-200 mb-8 text-lg max-w-xl mx-auto">
              Join 10,000+ citizens who've already decoded their government paperwork. Free, multilingual, and always accurate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-2xl font-bold text-purple-700 bg-white hover:bg-purple-50 hover:shadow-xl hover:scale-105 transition-all duration-200 text-base"
              >
                Get Started Free →
              </Link>
              <Link
                to="/explore"
                className="px-8 py-4 rounded-2xl font-bold text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-base"
              >
                Explore Procedures
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-white font-bold">CitizenBridge</span>
              </div>
              <p className="text-sm leading-relaxed">Making government accessible to every citizen of India.</p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                {['Explore Procedures', 'Upload Document', 'Legal Glossary', 'FAQs'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-purple-400 transition">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Contact Us'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-purple-400 transition">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Languages</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {['English', 'हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'मराठी', 'ਪੰਜਾਬੀ'].map((l) => (
                  <span key={l} className="px-2 py-1 rounded bg-slate-800 hover:bg-purple-900 hover:text-purple-300 cursor-pointer transition">{l}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs">© 2025 CitizenBridge. Built with ❤️ for India.</p>
            <p className="text-xs">Free Legal Guidance · Not a Law Firm · For Educational Purposes Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}