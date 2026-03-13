"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/scan', label: 'Scanner' },
    { href: '/ecosystem', label: 'Tiers' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'nav-blur h-16' : 'h-20 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-none tracking-tight">Relay</span>
            <span className="text-[10px] font-semibold text-muted tracking-widest uppercase mt-0.5">Community Edition</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-white' : 'text-secondary hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-border-strong mx-2" />
          <Link
            href="/scan"
            className="btn-primary py-2 px-5 text-sm"
          >
            Launch Scanner
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-secondary hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-base border-b border-border-strong p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                pathname === link.href ? 'text-white' : 'text-secondary font-normal'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/scan"
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full mt-2"
          >
            Launch Scanner
          </Link>
        </div>
      )}
    </nav>
  );
}
