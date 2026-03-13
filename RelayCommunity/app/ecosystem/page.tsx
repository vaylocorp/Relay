"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Box, ShieldCheck, ShieldAlert, Globe, ExternalLink, Github } from 'lucide-react';

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-base pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        <header className="max-w-3xl space-y-6">
          <div className="status-indicator">
            <span className="status-dot active" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Vaylo Tier Protocol</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">Operational <br /><span className="text-white/40">Layers.</span></h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-2xl font-medium">
            Relay provides a tiered architecture for investigative synthesis. The Community Edition 
            serves as the open protocol foundation, while Intelligence is strictly restricted.
          </p>
        </header>

        <div className="divider" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card p-12 flex flex-col justify-between border-white/5">
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <Box className="w-10 h-10 text-white/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Community Edition</span>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight">Open Protocol</h2>
                <p className="text-secondary leading-relaxed text-lg">
                  Designed for public transparency and independent research. Fully decentralized, 
                  self-hostable, and zero-retention by design.
                </p>
              </div>
              <ul className="space-y-4 pt-8 border-t border-border-subtle">
                <FeatureItem label="Public Source Aggregation" />
                <FeatureItem label="Zero Metadata Retention" />
                <FeatureItem label="Direct Source Attribution" />
                <FeatureItem label="Community Support Nodes" />
                <FeatureItem label="MIT Licensed Framework" />
              </ul>
            </div>
            <Link href="/scan" className="btn-secondary w-full py-5 uppercase text-xs tracking-[0.3em] font-black mt-16">
              Initialize Hub
            </Link>
          </div>

          <div className="intel-card p-12 rounded-2xl flex flex-col justify-between">
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 text-white" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Restricted Access</span>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white tracking-tight">Relay Intelligence</h2>
                <p className="text-white/70 leading-relaxed text-lg italic font-medium">
                  "The autonomous investigative cluster for high-stakes intelligence forensics."
                </p>
              </div>
              <ul className="space-y-4 pt-8 border-t border-white/10">
                <FeatureItem label="AI-Driven Behavioral Mapping" active />
                <FeatureItem label="Global Monitoring Mesh Nodes" active />
                <FeatureItem label="Darknet Breach & Leak Discovery" active />
                <FeatureItem label="Recursive Predictive Logic" active />
                <FeatureItem label="Authorized Agency Verification" active />
              </ul>
            </div>
            <a href="https://vaylo.xyz" target="_blank" rel="noreferrer" className="btn-primary w-full py-5 text-sm mt-16 shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
              Inquire Authorization
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-12">
          <div className="warning-box border-error/40 bg-error/5 flex flex-col items-center text-center p-16">
             <div className="warning-title mb-8">
               <ShieldAlert className="w-8 h-8 mr-1" />
               RESTRICTED OPERATIONAL NOTICE
             </div>
             <p className="text-2xl font-bold text-white mb-6 tracking-tight">
               RELAY INTELLIGENCE IS NOT PUBLIC.
             </p>
             <p className="text-secondary leading-relaxed max-w-3xl text-sm font-medium">
               Relay Intelligence services are strictly reserved for verified organizations, government entities, 
               and authorized cybersecurity professionals. Any attempt to gain unauthorized access by faking 
               an organization, government affiliation, or misrepresenting your identity will result in immediate 
               legal action and permanent blacklisting. We maintain zero tolerance for fraudulent access 
               attempts and will prosecute to the maximum extent of the law.
             </p>
             <div className="mt-8 px-6 py-2 border border-error/20 bg-error/10 text-error text-[10px] font-black uppercase tracking-[0.3em] rounded">
                Fraudulent Access = Prosecution
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <Check className={`w-4 h-4 ${active ? 'text-white' : 'text-white/20'}`} />
      <span className={`text-sm font-bold ${active ? 'text-white' : 'text-secondary'}`}>{label}</span>
    </li>
  );
}
