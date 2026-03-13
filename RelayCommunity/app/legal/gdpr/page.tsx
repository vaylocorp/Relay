"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, ShieldCheck } from 'lucide-react';

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-base pt-48 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted hover:text-white mb-12 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Terminal
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">GDPR Compliance</h1>
          <p className="text-xl text-secondary">Data sovereignty and privacy-by-design standards.</p>
        </header>

        <div className="space-y-16">
          <section className="legal-section">
            <h2 className="legal-title">1. Role of the Platform</h2>
            <div className="legal-content space-y-4">
              <p>Relay Community Edition is a technical instrument, not a data controller. The individual operator conducting investigations is the sole Data Controller for the purposes of GDPR. Relay provides the synthesis protocols to discover data already present in the public domain.</p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">2. Right to Erasure</h2>
            <div className="legal-content space-y-4">
              <p>Because Relay utilizes a stateless, zero-retention architecture, the "Right to Erasure" is inherently satisfied at the structural level. There is no persistent storage of personal data on Relay infrastructure that would require manual deletion; all session data is purged automatically.</p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">3. Data Portability</h2>
            <div className="legal-content space-y-4">
              <p>Users maintain full custody of their investigative findings. Relay provides instant export capabilities (JSON/CSV) to ensure data portability for all generated profiles and correlations.</p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">4. Purpose Limitation</h2>
            <div className="legal-content space-y-4">
              <p>Relay is designed strictly for investigative synthesis of public sources. It does not perform illegal scraping, bypass private authentication layers, or utilize non-public datasets.</p>
            </div>
          </section>

          <div className="divider" />

          <div className="glass-card p-8 bg-surface/50 border-white/10">
            <div className="flex items-center gap-3 mb-4 text-white">
              <ShieldCheck className="w-5 h-5 text-success" />
              <span className="font-bold uppercase tracking-widest text-xs">Compliance Status: ACTIVE</span>
            </div>
            <p className="text-sm text-secondary italic leading-relaxed">
              "Structural GDPR compliance is achieved through the technical reduction of data persistence across the entire Relay protocol."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
