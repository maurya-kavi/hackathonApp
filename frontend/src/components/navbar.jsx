import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'bn', label: 'বাং' },
  { code: 'ta', label: 'தமி' },
  { code: 'te', label: 'తె' },
  { code: 'kn', label: 'ಕ' },
];

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'About Us', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    
    // Read from Google Translate cookie to set correct initial language index
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const idx = languages.findIndex(l => l.code === match[1]);
      if (idx !== -1) setLangIndex(idx);
    }
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cycleLang = () => {
    const nextIndex = (langIndex + 1) % languages.length;
    const langCode = languages[nextIndex].code;
    
    // Set google translate cookie for both root paths
    if (langCode === 'en') {
      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;
      document.cookie = "googtrans=/en/en; path=/";
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=` + window.location.hostname;
      document.cookie = `googtrans=/en/${langCode}; path=/`;
    }
    
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm border-b border-border transition-all duration-300 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT — Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent tracking-tight">
              CitizenBridge
            </span>
          </Link>

          {/* CENTER — Nav Links + Language Toggle (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={cycleLang}
              title="Switch Language"
              className="ml-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {languages[langIndex]?.label}
            </button>
          </div>

          {/* RIGHT — Auth Buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl hover:shadow-lg hover:shadow-purple-200 hover:scale-105 transition-all duration-200"
            >
              Register
            </Link>
          </div>

          {/* MOBILE — Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-purple-50 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE — Dropdown Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-purple-100 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={cycleLang}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition flex items-center gap-2"
          >
            🌐 Language: {languages[langIndex]?.label}
          </button>
          <div className="pt-2 border-t border-purple-100 flex gap-3">
            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium border border-purple-200 text-purple-600 hover:bg-purple-50 transition">
              Login
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-md transition">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
