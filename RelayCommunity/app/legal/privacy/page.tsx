"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Scale, FileText, Lock, Globe } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base pt-48 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted hover:text-white mb-12 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Terminal
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Architecture</h1>
          <p className="text-xl text-secondary">A structural commitment to zero-footprint intelligence discovery.</p>
        </header>

        <div className="space-y-16">
          <section className="legal-section">
            <h2 className="legal-title">1. Operational Stewardship</h2>
            <div className="legal-content space-y-4">
              <p>Relay is engineered as a stateless synthesis engine. We operate on the principle of technical inability: our infrastructure is deliberately designed without the capacity to persistently store or log investigative identifiers.</p>
              <p>When you conduct a scan, target parameters exist only within the volatile memory (RAM) of the active request handler and are purged immediately upon the termination of the session.</p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">2. Data Minimization</h2>
            <div className="legal-content space-y-4">
              <p>Relay Community Edition acts as a transparent aggregation layer for public web data. We do not maintain user accounts, nor do we track investigative history. Each query is treated as an isolated, anonymous event.</p>
              <div className="glass-card p-6 mt-6 border-l-2 border-l-white">
                <p className="text-white font-bold mb-2 uppercase text-xs tracking-widest leading-none">Core Constraint</p>
                <p className="text-sm">We possess no database. We possess no logs. We possess no tracking cookies.</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-title">3. Public Source Transparency</h2>
            <div className="legal-content space-y-4">
              <p>Every finding presented by Relay includes a direct reference to its original public source. This ensures that all intelligence remains verifiable and traceable to its origin point. Relay does not generate new data; it provides a structured view of pre-existing public information.</p>
            </div>
          </section>

          <div className="divider" />

          <footer className="text-sm text-muted">
            <p>Last Updated: March 2026</p>
            <p className="mt-2">Protocol: RELAY-CE v0.8.2</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
