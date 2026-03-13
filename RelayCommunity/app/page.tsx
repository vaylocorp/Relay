"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Lock, Shield, Database, Zap, Binary, Github } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base">
      <section className="relative pt-48 pb-32 px-6 border-b border-border-subtle overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <div className="status-indicator mb-8">
              <span className="status-dot active" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Vaylo Protocol Active</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1] mb-8 tracking-tighter">
              RELAY <br />
              <span className="text-white/40">COMMUNITY.</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary mb-12 leading-relaxed max-w-2xl font-medium">
              The professional open-source standard for digital footprint synthesis. 
              Built for precision, transparency, and ethical discovery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/scan" className="btn-primary px-12 py-5 h-auto text-base">
                Initialize Scanner <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="https://github.com/vaylocorp/Relay" target="_blank" className="btn-secondary px-10 py-5 h-auto text-base">
                <Github className="mr-2 w-5 h-5" /> Source Code
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-b border-border-subtle bg-surface/10">
        <div className="max-w-7xl mx-auto gap-24 flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-12">
            <h2 className="text-4xl font-bold tracking-tight">Technical <span className="text-white/40">Philosophy.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ValueItem 
                icon={<Lock className="w-5 h-5" />}
                title="Stateless Ops"
                desc="Investigative data remains volatile. Our architecture fundamentally cannot store target identifiers."
              />
              <ValueItem 
                icon={<Zap className="w-5 h-5" />}
                title="Real-time Synthesis"
                desc="Aggregate 15+ sources instantly through our optimized correlation pipelines."
              />
              <ValueItem 
                icon={<Binary className="w-5 h-5" />}
                title="Verifiable Data"
                desc="Every finding is directly attributed to its public source for absolute transparency."
              />
              <ValueItem 
                icon={<Database className="w-5 h-5" />}
                title="Open Protocol"
                desc="Built by Vaylo to democratize access to high-precision OSINT tooling."
              />
            </div>
          </div>
          <div className="w-full md:w-80 h-80 glass-card flex items-center justify-center p-12 bg-white/5 border-white/10 shrink-0">
             <Shield className="w-32 h-32 text-white/10" />
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted">Organization</h3>
            <h2 className="text-4xl font-bold">Part of the <span className="text-white/40">Vaylo Ecosystem.</span></h2>
            <p className="text-lg text-secondary leading-relaxed">
              Relay is an official Vaylo project. We are dedicated to building advanced, 
              private-by-design infrastructure for the next generation of security researchers.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <OrgFeature label="Open Source Focus" />
            <OrgFeature label="Privacy Centric" />
            <OrgFeature label="Security Built-in" />
            <OrgFeature label="Community Driven" />
          </div>
          <div className="pt-12">
             <Link href="/about" className="text-white font-bold inline-flex items-center hover:gap-2 transition-all group">
               Learn more about our Protocol <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" />
             </Link>
          </div>
        </div>
      </section>

      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card p-12 md:p-20 text-center space-y-12 border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Ready to <span className="text-white/40">Synthesize?</span></h2>
              <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Experience the precision of the Relay protocol. Stateless, secure, 
                and engineered for high-stakes investigative discovery.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/scan" className="btn-primary px-16 py-6 text-lg w-full sm:w-auto h-auto shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                Initialize Hub
              </Link>
              <Link href="/about" className="text-white/60 hover:text-white font-bold px-8 py-4 transition-all">
                Read the Protocol
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-secondary leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function OrgFeature({ label }: { label: string }) {
  return (
    <div className="px-6 py-3 bg-surface border border-border-subtle rounded-full text-xs font-bold text-white uppercase tracking-widest">
      {label}
    </div>
  );
}
