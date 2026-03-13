"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, Check } from 'lucide-react';

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-base pt-48 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted hover:text-white mb-12 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Terminal
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Disclosure</h1>
          <p className="text-xl text-secondary">Transparent telemetry and persistent storage policies.</p>
        </header>

        <div className="space-y-16">
          <section className="legal-section">
            <h2 className="legal-title">1. Tracking Status</h2>
            <div className="legal-content space-y-4">
              <p>Relay Community Edition maintains a zero-tracking policy. We do not deploy advertising cookies, behavioral tracking pixels, or third-party analytics scripts.</p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">2. Functional Storage</h2>
            <div className="legal-content">
              <p className="mb-8">We utilize the minimum required session storage only for terminal functionality. This data is not transmitted to our servers and remains purely on the client side.</p>
              
              <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-hover border-b border-border-subtle">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Identifier</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Purpose</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    <CookieRow id="RELAY_SESSION" purpose="Interface State" type="Memory" />
                    <CookieRow id="AD_TRACKER" purpose="None" type="Inactive" disabled />
                    <CookieRow id="FB_PIXEL" purpose="None" type="Inactive" disabled />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="divider" />

          <div className="glass-card p-8 bg-success/5 border-success/20">
             <div className="flex items-center gap-3 mb-2 text-success">
               <Check className="w-5 h-5 font-black" />
               <span className="font-bold uppercase tracking-[0.2em] text-xs">Identity Shield Active</span>
             </div>
             <p className="text-sm text-secondary leading-relaxed">Your browsing session is protected from all third-party telemetry through our structural zero-tracking architecture.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CookieRow({ id, purpose, type, disabled = false }: any) {
  return (
    <tr className={disabled ? 'opacity-30' : ''}>
      <td className="px-6 py-4 text-xs font-bold text-white mono">{id}</td>
      <td className="px-6 py-4 text-xs text-secondary">{purpose}</td>
      <td className="px-6 py-4">
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${disabled ? 'bg-border-strong text-muted' : 'bg-success/20 text-success'}`}>
          {type}
        </span>
      </td>
    </tr>
  );
}
