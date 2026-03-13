"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Gavel, FileWarning } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base pt-48 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted hover:text-white mb-12 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Terminal
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Use</h1>
          <p className="text-xl text-secondary">Operational guidelines for investigative synthesis.</p>
        </header>

        <div className="space-y-16">
          <section className="legal-section">
            <h2 className="legal-title">1. Authorized Engagement</h2>
            <div className="legal-content space-y-4">
              <p>Relay is an investigative instrument designed for security professionals and authorized researchers. By utilizing the platform, you affirm that your investigation vectors comply with all applicable local, national, and international laws.</p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">2. Prohibited Vectors</h2>
            <div className="legal-content space-y-4">
              <p>The following activities are strictly prohibited within the Relay ecosystem:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>Bypassing private authentication layers.</li>
                <li>Stalking or harassment of private individuals.</li>
                <li>Commercial exploitation of investigative results.</li>
                <li>Misrepresentation of organizational or governmental authority to gain restricted access.</li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">3. Restricted Access Policy</h2>
            <div className="legal-content space-y-4 font-bold text-white">
              <p>Relay Intelligence and Enterprise Tiers are strictly reserved for verified organizations. Attempting to bypass security measures or faking credentials to gain access is a breach of federal cyber laws and will result in immediate legal prosecution and reporting to the relevant authorities.</p>
            </div>
          </section>

          <div className="warning-box border-error/40 bg-error/5">
             <div className="warning-title">
               <FileWarning className="w-4 h-4" />
               Liability Waiver
             </div>
             <p className="text-sm text-secondary leading-relaxed">
               Relay Community Edition is provided "as-is" without warranty of any kind. Vaylo Corporation 
               and its contributors are not liable for any misuse of the platform or any investigative errors 
               arising from public datasets.
             </p>
          </div>

          <div className="divider" />

          <footer className="text-sm text-muted">
            <p>© {new Date().getFullYear()} VAYLO CORPORATION. MIT LICENSE.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
