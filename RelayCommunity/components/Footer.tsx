"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Github, Globe, ExternalLink, ArrowRight } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Scanner', href: '/scan' },
      { label: 'Tiers', href: '/ecosystem' },
      { label: 'About', href: '/about' },
    ],
    company: [
      { label: 'Vaylo Corp', href: 'https://vaylo.xyz', external: true },
      { label: 'GitHub', href: 'https://github.com/vaylocorp', external: true },
    ],
    legal: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'GDPR', href: '/legal/gdpr' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Cookies', href: '/legal/cookies' },
    ]
  };

  return (
    <footer className="bg-base border-t border-border-subtle pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-black" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Relay</span>
            </Link>
            <p className="text-secondary leading-relaxed max-w-sm">
              An open-source intelligence platform designed for digital footprint 
              correlation and investigative synthesis.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <SocialIcon href="https://github.com/vaylocorp" icon={<Github className="w-5 h-5" />} />
              <SocialIcon href="https://vaylo.xyz" icon={<Globe className="w-5 h-5" />} />
            </div>
          </div>

          <FooterColumn title="Protocol" links={links.product} />
          <FooterColumn title="Organization" links={links.company} />
          <FooterColumn title="Compliance" links={links.legal} />
        </div>

        <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-white tracking-widest uppercase">Vaylo Organization</p>
            <p className="text-[11px] text-muted mono">MIT License · Core Version 0.8.2 Community</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="status-indicator">
              <span className="status-dot active" />
              <span className="text-[10px] font-black uppercase tracking-widest">Network Active</span>
            </div>
            <span className="text-muted text-xs">/</span>
            <p className="text-muted text-[11px] mono">© {year}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: any[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/50">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link 
              href={link.href} 
              className="text-sm text-secondary hover:text-white transition-colors inline-flex items-center"
              target={link.external ? "_blank" : undefined}
            >
              {link.label}
              {link.external && <ExternalLink className="ml-1.5 w-3 h-3 opacity-30" />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="p-2 border border-border-strong rounded-lg text-secondary hover:text-white hover:border-white transition-all bg-surface/50"
      target="_blank" 
      rel="noreferrer"
    >
      {icon}
    </a>
  );
}
