"use client";

import React, { useState, useEffect } from 'react';
import { ShieldX, AlertTriangle, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function CommunityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('relay_community_accepted_v1');
    if (!hasAccepted) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('relay_community_accepted_v1', 'true');
      setIsOpen(false);
      document.body.style.overflow = 'unset';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-3xl">
      <div className="glass-card w-full max-w-2xl bg-[#0a0a0b] border-white/5 shadow-[0_80px_160px_rgba(0,0,0,1)] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="p-12 md:p-16 space-y-12 relative z-10">
          <header className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-7 h-7 text-white/90" />
              </div>
              <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-success animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Community Hub v1.0</span>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">The Frontier of <br/><span className="text-white/40">Digital Intelligence.</span></h2>
            </div>
          </header>

          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-lg text-white/90 leading-relaxed font-medium tracking-tight">
                Welcome to <span className="text-white font-black">Relay Community.</span><br/>
                An open-source ecosystem built for transparent digital discovery and behavioural mapping.
              </p>
              <p className="text-sm text-white/40 leading-relaxed font-medium">
                This edition provides the core framework for complex investigative research. While the restricted Agency suite offers deeper correlation metrics, this hub empowers professionals to synthesize digital footprints with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Operational Guidance</span>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                  We recommend <span className="text-white font-bold">verifying key intelligence nodes</span> and cross-referencing findings before making operational conclusions.
                </p>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Autonomy & Trust</span>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                  This framework is open for modification. Users assume full responsibility for deployments and actions derived from synthesized data.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 space-y-10">
            <label className="flex items-center gap-5 cursor-pointer group/check select-none">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={accepted} 
                  onChange={() => setAccepted(!accepted)}
                  className="peer h-6 w-6 appearance-none border border-white/10 rounded-lg bg-white/[0.02] checked:border-white/40 checked:bg-white/5 transition-all cursor-pointer" 
                />
                <ShieldCheck className="absolute h-4 w-4 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-all duration-500 scale-50 peer-checked:scale-100" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Authorize Session Access</span>
            </label>

            <button 
              onClick={handleAccept}
              disabled={!accepted}
              className={`w-full py-7 rounded-2xl font-black uppercase tracking-[0.5em] text-xs transition-all duration-500 flex items-center justify-center gap-4 ${
                accepted 
                  ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_30px_60px_rgba(255,255,255,0.02)] scale-100' 
                  : 'bg-white/[0.03] text-white/10 cursor-not-allowed grayscale scale-95'
              }`}
            >
              Initialize Intelligence Hub <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
