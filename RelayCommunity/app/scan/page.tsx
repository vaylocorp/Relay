"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, X, Copy, Check, Terminal, Database, 
  Search, ShieldAlert, Globe, ArrowRight, User, PlusCircle, Trash2, 
  ShieldX, FileJson, FileText, Download, Loader2, ListChecks, Settings2, Key, ChevronDown, Lock as LockIcon, ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  'General', 'GitHub', 'X / Twitter', 'Instagram', 'LinkedIn',
  'Facebook', 'Reddit', 'TikTok', 'YouTube', 'Twitch',
  'Telegram', 'Discord', 'Mastodon', 'GitLab', 'StackOverflow', 'Pinterest', 'Medium', 'Other'
];

export default function ScanPage() {
  const [form, setForm] = useState({
    firstName: '', surname: '', email: '', phone: '',
    city: '', country: '', year: '', ip: '', domain: '',
    organization: '', serpApiKey: '',
    shodanKey: '',
    vtKey: '',
    hibpKey: ''
  });
  const [usernames, setUsernames] = useState([{ value: '', platform: 'General' }]);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Findings');
  const [progress, setProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const filledFields = useMemo(() => {
    const fKeys = ['firstName', 'surname', 'email', 'phone', 'city', 'country', 'year', 'ip', 'domain', 'organization'];
    const fCount = fKeys.filter(k => (form as any)[k].trim()).length;
    const uCount = usernames.filter(u => u.value.trim()).length;
    return fCount + uCount;
  }, [form, usernames]);

  const canStart = filledFields > 0;

  useEffect(() => {
    const saved = sessionStorage.getItem('relay_keys');
    if (saved) {
      try {
        const keys = JSON.parse(saved);
        setForm(p => ({ ...p, ...keys }));
      } catch (e) {}
    }
  }, []);

  const saveKeys = () => {
    const keys = {
      serpApiKey: form.serpApiKey,
      shodanKey: form.shodanKey,
      vtKey: form.vtKey,
      hibpKey: form.hibpKey
    };
    sessionStorage.setItem('relay_keys', JSON.stringify(keys));
    setSettingsOpen(false);
  };

  useEffect(() => {
    if (isScanning) {
      const logs = [
        "Initializing core synthesis node...",
        "Resolving target identifiers...",
        "Querying public DNS registers...",
        "Validating IP connectivity...",
        "Aggregating public social indices...",
        "Cross-referencing breach archives...",
        "Synthesizing final intelligence report..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setScanLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[i]}`]);
          setProgress(Math.floor(((i + 1) / logs.length) * 100));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 700);
      return () => clearInterval(interval);
    } else {
      setScanLogs([]);
      setProgress(0);
    }
  }, [isScanning]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const updateHandle = (i: number, field: string, val: string) => {
    const next = [...usernames];
    next[i] = { ...next[i], [field]: val };
    setUsernames(next);
  };

  const triggerScan = async () => {
    if (!canStart) return;
    setResults(null);
    setIsScanning(true);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, usernames })
      });
      const data = await res.json();
      if (res.ok) {
        setTimeout(() => {
          setResults(data);
          setIsScanning(false);
          setActiveTab('Findings');
        }, 5000); 
      } else {
        setIsScanning(false);
        alert(data.error || "Scan failed");
      }
    } catch {
      setIsScanning(false);
      alert("Network error");
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relay_intelligence_${Date.now()}.json`;
    a.click();
    setDownloadOpen(false);
  };

  const exportCSV = () => {
    let csv = "ID,Category,Label,Value,Status\n";
    results.findings?.forEach((f: any, i: number) => csv += `${i + 1},Finding,"${f.label}","${f.value}","${f.severity}"\n`);
    results.profiles?.forEach((p: any, i: number) => csv += `${i + 1},Profile,"${p.platform}","${p.url}","${p.status}"\n`);
    results.correlations?.forEach((c: any, i: number) => csv += `${i + 1},Correlation,"${c.type}","${c.detail}",""\n`);
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relay_intelligence_${Date.now()}.csv`;
    a.click();
    setDownloadOpen(false);
  };

  if (isScanning) {
    return (
      <div className="min-h-screen bg-base pt-32 flex justify-center px-6">
        <div className="w-full max-w-2xl space-y-12">
          <div className="text-center space-y-4">
             <div className="relative w-20 h-20 mx-auto mb-8">
                <Loader2 className="w-full h-full text-white animate-spin opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal className="w-8 h-8 text-white" />
                </div>
             </div>
            <h2 className="text-4xl font-black tracking-tighter">SYNTHESIZING...</h2>
            <p className="text-secondary text-lg font-medium">Aggregating real-time intelligence nodes.</p>
          </div>
          
          <div className="glass-card bg-black border-white/5 p-8 font-mono text-xs overflow-hidden h-[400px] flex flex-col shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-none">
              {scanLogs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-white/20 shrink-0">{log.split(']')[0]}]</span>
                  <span className="text-white/90">{log.split(']')[1]}</span>
                </div>
              ))}
              <div className="flex gap-4 animate-pulse">
                <span className="text-white/20 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-white font-bold select-none cursor-default">_</span>
              </div>
            </div>
            <div className="mt-8 space-y-4 pt-4 border-t border-white/5">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Protocol Delta</span>
                 <span className="text-[10px] font-black text-white">{progress}%</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-white transition-all duration-700 shadow-[0_0_10px_white]" style={{ width: `${progress}%` }} />
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    const tabs = ['Findings', 'Profiles', 'Correlations', 'Sources'];
    return (
      <div className="min-h-screen bg-base pt-32 pb-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
            <div className="space-y-4 text-white">
              <div className="status-indicator">
                 <span className="status-dot active animate-pulse" />
                 <span className="text-[10px] uppercase font-black tracking-[0.4em] leading-none text-white/60">Synthesis Hub Active</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter">Analysis Complete.</h1>
              <p className="text-secondary text-xl font-medium max-w-2xl leading-relaxed">Intelligence report finalized in stateless container.</p>
            </div>
            
            <div className="flex gap-4 relative">
              <div className="relative">
                <button 
                  onClick={() => setDownloadOpen(!downloadOpen)}
                  className="btn-secondary py-4 px-8 text-sm font-black uppercase tracking-widest gap-3 shadow-xl hover:bg-white hover:text-black transition-all"
                >
                  <Download className="w-5 h-5" />
                  Export Data
                </button>
                {downloadOpen && (
                  <div className="absolute top-full right-0 mt-4 bg-[#1a1a1c] border border-white/10 rounded-2xl p-3 w-64 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                    <button onClick={exportJSON} className="w-full text-left px-5 py-4 rounded-xl hover:bg-white text-white hover:text-black transition-all flex items-center gap-4 group">
                      <FileJson className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tighter">JSON Export</span>
                        <span className="text-[10px] font-bold opacity-60">Complete Object Data</span>
                      </div>
                    </button>
                    <button onClick={exportCSV} className="w-full text-left px-5 py-4 rounded-xl hover:bg-white text-white hover:text-black transition-all flex items-center gap-4 group mt-1">
                      <FileText className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tighter">CSV Document</span>
                        <span className="text-[10px] font-bold opacity-60">Tabular Spreadsheet</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => { setResults(null); reset(); }} className="btn-primary py-4 px-12 text-sm font-black uppercase tracking-widest shadow-xl">
                Restart Proxy
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-start text-white">
            <nav className="flex lg:flex-col gap-3 p-1 shrink-0">
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`w-full text-left px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === t 
                      ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </nav>

            <div className="lg:col-span-3 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {activeTab === 'Findings' && (
                <div className="space-y-6">
                  {results.findings?.map((f: any, i: number) => (
                    <div key={i} className="glass-card p-10 flex items-center justify-between group hover:border-white/30 transition-all bg-white/[0.02]">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{f.label}</p>
                        <p className="text-3xl font-black tracking-tighter text-white">
                          {f.value}
                        </p>
                      </div>
                      <div className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] ${
                        f.severity === 'high' ? 'border-error/40 text-error bg-error/10' : 
                        f.severity === 'medium' ? 'border-warning/40 text-warning bg-warning/10' : 
                        'border-success/40 text-success bg-success/10'
                      }`}>
                        {f.severity || 'info'}
                      </div>
                    </div>
                  ))}
                  {(!results.findings || results.findings.length === 0) && (
                    <div className="p-20 text-center glass-card border-dashed">
                       <ShieldX className="w-12 h-12 text-white/10 mx-auto mb-6" />
                       <p className="text-white/40 text-sm font-black uppercase tracking-widest">No structural findings mapped.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Profiles' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {results.profiles.map((p: any, i: number) => (
                    <div key={i} className="glass-card p-10 group hover:border-white/30 transition-colors bg-white/[0.02]">
                      <div className="flex justify-between items-center mb-10">
                        <div className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 tracking-widest">{p.platform}</div>
                        <Globe className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-lg font-bold text-white mb-4 leading-none truncate">{p.url}</p>
                      <div className="flex items-center gap-2 mb-10">
                        <div className={`w-2 h-2 rounded-full ${p.status === 'Found' ? 'bg-success' : 'bg-white/20'}`} />
                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{p.status}</span>
                      </div>
                      <a href={p.url} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-widest text-white border-b border-white hover:border-transparent transition-all pb-1">
                        Open Node
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Correlations' && (
                <div className="space-y-8">
                   {results.correlations.map((c: any, i: number) => (
                    <div key={i} className="glass-card p-12 bg-white/[0.03] border-l-8 border-l-white flex gap-12 items-start">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-2xl">
                        <Database className="w-8 h-8 text-black" />
                      </div>
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{c.type}</span>
                        <p className="text-3xl font-black tracking-tighter text-white leading-tight">{c.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Sources' && (
                <div className="space-y-6">
                  {results.sources.map((s: any, i: number) => (
                    <div key={i} className="glass-card p-8 flex items-center gap-10 group bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                         <Search className="w-6 h-6 text-white/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-white mb-3 truncate">{s.title}</h4>
                        <div className="flex items-center gap-6">
                          <span className="mono text-[10px] text-white/40 uppercase tracking-widest">{s.url.includes('http') ? new URL(s.url).hostname : 'LOCAL'}</span>
                          <span className="text-[10px] font-black text-white px-3 py-1 rounded bg-white/5 uppercase tracking-[0.2em]">{s.category}</span>
                        </div>
                      </div>
                      <a href={s.url} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                        <ArrowRight className="w-6 h-6 -rotate-45" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        
        <div className="flex-1 space-y-20 lg:max-w-[850px]">
          <header className="space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-6">
                <div className="status-indicator">
                  <span className="status-dot active animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hub Status: Operational</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                  INTELLIGENCE <br />
                  <span className="text-white/40 tracking-widest">GATEWAY.</span>
                </h1>
              </div>
              <button 
                onClick={() => setSettingsOpen(true)}
                className="p-4 glass-card border-white/10 hover:bg-white hover:text-black transition-all shadow-xl group"
              >
                <Settings2 className="w-6 h-6 opacity-60 group-hover:opacity-100" />
              </button>
            </div>
            <p className="text-2xl text-secondary max-w-2xl font-medium leading-relaxed">
              Open investigation container. Provide target identifiers to begin synthesis.
            </p>
          </header>

          <div className="divider" />

          <div className="space-y-24">
            <section className="space-y-12">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Target Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormInput label="Identifier: First Name" name="firstName" value={form.firstName} onChange={handleInput} placeholder="LEGAL PRIMARY" />
                <FormInput label="Identifier: Last Name" name="surname" value={form.surname} onChange={handleInput} placeholder="LEGAL SECONDARY" />
                <FormInput label="Identifier: Email" name="email" value={form.email} onChange={handleInput} placeholder="NAME@SERVICE.COM" />
                <FormInput label="Identifier: Phone" name="phone" value={form.phone} onChange={handleInput} placeholder="+00 000 000 000" />
              </div>
            </section>

            <section className="space-y-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Spatial & Network Mapping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="City / Region" name="city" value={form.city} onChange={handleInput} placeholder="GEOGRAPHIC INDEX" />
                <FormInput label="Birth Vector" name="year" value={form.year} onChange={handleInput} placeholder="YYYY" />
                <FormInput label="Affiliated Node" name="organization" value={form.organization} onChange={handleInput} placeholder="INSTITUTIONAL ENTITY" />
                <FormInput label="IP / Target Node" name="ip" value={form.ip} onChange={handleInput} placeholder="0.0.0.0 / DOMAIN.COM" />
              </div>
            </section>

            <section className="space-y-12">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Social Proxies</h3>
                <button 
                  onClick={() => setUsernames([...usernames, { value: '', platform: 'General' }])}
                  className="btn-secondary py-3 px-6 text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  <PlusCircle className="mr-3 w-4 h-4" /> Add Virtual Proxy
                </button>
              </div>
              <div className="space-y-6">
                {usernames.map((u, i) => (
                  <div key={i} className="flex gap-6 items-center">
                    <div className="flex-1">
                       <input 
                        placeholder="ENTER HANDLE"
                        className="input-field font-black uppercase tracking-[0.2em] h-16 text-white"
                        value={u.value}
                        onChange={e => updateHandle(i, 'value', e.target.value)}
                      />
                    </div>
                    <div className="w-64">
                       <select 
                        className="input-field font-black text-[10px] py-0 h-16 bg-surface uppercase tracking-[0.3em] text-white cursor-pointer"
                        value={u.platform}
                        onChange={e => updateHandle(i, 'platform', e.target.value)}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <button 
                      onClick={() => setUsernames(usernames.filter((_, idx) => idx !== i))}
                      className="p-5 text-white/20 hover:text-error transition-all hover:bg-error/5 rounded-2xl border border-white/5"
                      disabled={usernames.length === 1}
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-16 flex flex-col sm:flex-row items-center justify-between gap-16 border-t border-white/5 mt-24">
              <div className="flex-1 w-full max-w-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Intelligence Mesh</span>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${filledFields > 3 ? 'text-white' : 'text-white/30'}`}>
                    {filledFields > 4 ? 'Verified Deep' : filledFields > 1 ? 'Balanced Synthesis' : 'Incomplete Matrix'}
                  </span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full bg-white transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]`} style={{ width: `${Math.min(100, (filledFields / 6) * 100)}%` }} />
                </div>
              </div>
              <button 
                onClick={triggerScan}
                disabled={!canStart}
                className="btn-primary px-20 py-8 text-xl font-black uppercase tracking-widest w-full sm:w-auto h-auto shadow-[0_20px_60px_rgba(255,255,255,0.1)] group hover:scale-105 active:scale-95 transition-all"
              >
                Execute Synthesis <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-[350px] space-y-8 lg:sticky lg:top-32 h-fit">
          <div className="glass-card p-10 bg-white/[0.01] border-white/5 space-y-12">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] leading-none">Operational Map</h4>
                <div className="h-px flex-1 bg-white/5 ml-4" />
              </div>
              <div className="space-y-6">
                <LevelItem label="Target Identification" filled={filledFields >= 1} />
                <LevelItem label="Network Correlation" filled={filledFields >= 3} />
                <LevelItem label="Recursive Depth" filled={filledFields >= 5} />
              </div>
            </div>
            <div className="space-y-6 pt-10 border-t border-white/5">
               <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Open Core Active</span>
               </div>
               <p className="text-[10px] text-secondary leading-relaxed font-bold uppercase tracking-widest opacity-40">
                Stateless reconnaissance mode engaged.
               </p>
            </div>
          </div>

          <div className="warning-box border-error/20 bg-error/5 p-10">
             <div className="flex items-center gap-3 mb-8 text-error">
               <ShieldX className="w-6 h-6" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] leading-none">Security Mask</h4>
             </div>
             <p className="text-[12px] text-error leading-relaxed font-black uppercase tracking-widest">
               RESTRICTED NODES INACTIVE.
             </p>
             <p className="text-[10px] text-error/60 leading-relaxed mt-6 italic font-medium">
               Advanced multithreading, AI-driven behavioral analysis, and verified breach monitoring are strictly restricted to agency tiers.
             </p>
          </div>
        </aside>
      </div>

      {settingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500">
           <div className="glass-card w-full max-w-5xl p-10 md:p-14 space-y-10 bg-[#0d0d0f] border-white/10 shadow-[0_80px_150px_rgba(0,0,0,1)] relative overflow-hidden group/modal">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.02] blur-[100px] rounded-full group-hover/modal:bg-white/[0.05] transition-colors duration-1000" />
              
              <div className="flex justify-between items-start relative z-10">
                 <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner">
                        <Settings2 className="w-7 h-7 text-white/80" />
                      </div>
                      <div className="space-y-0.5">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase leading-none">Intelligence Nodes</h2>
                        <div className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Operational Connectivity</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/40 text-base font-medium max-w-3xl leading-relaxed">
                      Stateless elective connectors. Authorize third-party forensics for recursive behavioral mapping. 
                      Keys remain in-memory and are purged upon hub termination.
                    </p>
                 </div>
                 <button 
                  onClick={() => setSettingsOpen(false)} 
                  className="p-4 text-white/10 hover:text-white transition-all hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5 duration-500"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                 <KeyInput icon={<Search className="w-4 h-4" />} label="SerpAPI: Global Search Intelligence" name="serpApiKey" value={form.serpApiKey} onChange={handleInput} placeholder="serp_authentication_token_..." />
                 <KeyInput icon={<Database className="w-4 h-4" />} label="Shodan: Infrastructure Auditor" name="shodanKey" value={form.shodanKey} onChange={handleInput} placeholder="shodan_vault_key_..." />
                 <KeyInput icon={<ShieldAlert className="w-4 h-4" />} label="VirusTotal: Cybersecurity Gateway" name="vtKey" value={form.vtKey} onChange={handleInput} placeholder="vt_matrix_access_token_..." />
                 <KeyInput icon={<LockIcon className="w-4 h-4" />} label="HaveIBeenPwned: Breach Reconciliation" name="hibpKey" value={form.hibpKey} onChange={handleInput} placeholder="hibp_cloud_auth_id_..." />
              </div>

              <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-8 relative z-10">
                 <div className="flex w-full gap-5">
                    <button onClick={saveKeys} className="btn-primary flex-1 py-5 font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_40px_rgba(255,255,255,0.05)] border border-white/20">Authorize Secure Session</button>
                    <button onClick={() => setSettingsOpen(false)} className="btn-secondary px-12 font-black uppercase tracking-[0.3em] text-xs opacity-40 hover:opacity-100 transition-all">Discard Access</button>
                 </div>
                 <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.01] text-[9px] text-white/30 uppercase tracking-[0.5em] font-bold">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    Stateless Silo: Tokens Erased on Hub Reset
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  function reset() {
    setForm(p => ({
      ...p,
      firstName: '', surname: '', email: '', phone: '',
      city: '', country: '', year: '', ip: '', domain: '',
      organization: '',
    }));
    setUsernames([{ value: '', platform: 'General' }]);
  }
}

function FormInput({ label, name, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-focus-within:text-white/60 transition-colors">{label}</label>
        <div className="w-1 h-1 rounded-full bg-white/10 group-focus-within:bg-white/40 transition-colors" />
      </div>
      <input 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field h-16 placeholder:opacity-10 uppercase font-bold text-xs tracking-widest text-white shadow-sm"
      />
    </div>
  );
}

function KeyInput({ icon, label, name, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-3 group/input">
      <div className="flex items-center gap-2.5 px-1">
        <div className="text-white/20 group-focus-within/input:text-white/60 transition-colors">{icon}</div>
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-focus-within/input:text-white/80 transition-colors">{label}</label>
      </div>
      <div className="flex items-center bg-white/[0.01] border border-white/5 rounded-[1.25rem] group-focus-within/input:border-white/20 group-focus-within/input:bg-white/[0.04] transition-all overflow-hidden p-1">
        <div className="w-11 h-11 flex items-center justify-center shrink-0 bg-white/[0.03] rounded-[0.9rem] border border-white/5 ml-1 shadow-inner">
          <Key className="w-3.5 h-3.5 text-white/20 group-focus-within/input:text-white/60 transition-colors" />
        </div>
        <input 
          name={name}
          value={value}
          onChange={onChange}
          type="password"
          placeholder={placeholder || "auth_token_..."}
          className="flex-1 bg-transparent border-none outline-none h-11 px-6 font-mono text-[11px] tracking-[0.1em] text-white/40 focus:text-white placeholder:text-white/25 placeholder:font-sans placeholder:tracking-normal"
        />
      </div>
    </div>
  );
}

function LevelItem({ label, filled }: { label: string, filled: boolean }) {
  return (
    <div className={`flex items-center gap-5 transition-all duration-700 ${filled ? 'opacity-100 translate-x-1' : 'opacity-20 translate-x-0'}`}>
      <div className={`w-3 h-3 rounded-sm rotate-45 border ${filled ? 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/20'}`} />
      <span className="text-[12px] font-black text-white uppercase tracking-[0.3em] font-mono">{label}</span>
    </div>
  );
}
