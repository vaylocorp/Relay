"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Check, ShieldCheck, ShieldAlert, ArrowRight, Github, Mail, MapPin, AlertTriangle, Scale, Zap, Activity, Database, Lock, Copy } from "lucide-react";

export default function IntelligenceGatewayPage() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [status, setStatus] = useState<"idle" | "error" | "success" | "loading">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const blockedDomains = ["yahoo.com", "ymail.com", "mail.ru", "temp-mail.org", "guerrillamail.com"];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const getMailContent = () => {
    const subject = "Relay Intelligence Edition - Access Request";
    const body = `Access Request Details:\n\nName: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org}\n\nMessage:\n${form.message}\n\n---\nRelay Investigative Protocol v1.0`;
    return { subject, body };
  };

  const handleCopy = () => {
    const { subject, body } = getMailContent();
    const fullText = `To: vaylocorp@gmail.com\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const emailDomain = form.email.split("@")[1]?.toLowerCase();
    
    if (!emailDomain) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (blockedDomains.includes(emailDomain)) {
      setErrorMessage(`The domain "${emailDomain}" is flag-listed as low-trust. Please use a verified provider.`);
      setStatus("error");
      return;
    }

    const { subject, body } = getMailContent();
    const mailtoUrl = `mailto:vaylocorp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus("success");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-base selection:bg-white/10 selection:text-white">
      <section className="relative pt-48 pb-24 px-6 overflow-hidden border-b border-border-subtle">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative text-center">
          <div className="status-indicator justify-center mb-8">
            <span className="status-dot danger animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 leading-none">Restricted Intelligence Tier</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[1] mb-8 tracking-tighter">
            GATEWAY <br />
            <span className="text-white/30 uppercase tracking-widest text-4xl md:text-6xl">Intelligence Edition</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-70">
            Autonomous investigative infrastructure for professional operational security and defensive intelligence synthesis.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-white/10" /> Vaylo Corporation
                </h3>
                <h2 className="text-4xl font-bold leading-tight tracking-tight">Professional <br /><span className="text-white/40">Infrastructure.</span></h2>
                <p className="text-secondary font-medium leading-relaxed pr-8 border-l border-white/10 pl-6">
                  Relay is maintained by Vaylo as the open-standard for digital footprinting. 
                  The Intelligence Edition is a private fork designed for high-capacity synthesis and automated behavioral discovery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InfoCard 
                  icon={<MapPin className="w-5 h-5 text-white/40" />}
                  label="European HQ"
                  value="Italy (EU)"
                />
                <InfoCard 
                  icon={<Github className="w-5 h-5 text-white/40" />}
                  label="Open Repositories"
                  value="github.com/vaylocorp"
                  link="https://github.com/vaylocorp"
                />
                <InfoCard 
                  icon={<Mail className="w-5 h-5 text-white/40" />}
                  label="Direct Contact"
                  value="vaylocorp@gmail.com"
                  link="mailto:vaylocorp@gmail.com"
                />
              </div>
            </div>

            <div className="p-8 glass-card border-white/5 bg-white/[0.01] space-y-8 rounded-2xl">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/60 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-white/40" /> Technical Infrastructure
              </h4>
              <div className="space-y-6">
                <CapabilityItem 
                  icon={<Activity className="w-4 h-4" />}
                  title="Recursive Synthesis"
                  desc="Multi-layered correlation of fragmented digital identifiers across private data streams."
                />
                <CapabilityItem 
                  icon={<Database className="w-4 h-4" />}
                  title="Restricted Node Mesh"
                  desc="Access to private synthesis nodes ensuring volatility and high-capacity discovery."
                />
                <CapabilityItem 
                  icon={<Lock className="w-4 h-4" />}
                  title="Privileged Access"
                  desc="State-of-the-art obfuscation protocols for sensitive investigative operations."
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 md:p-12 border-white/10 bg-white/[0.02] shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-32 h-32" />
              </div>
              
              <div className="relative space-y-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight text-white uppercase">Access Request</h3>
                  <div className="h-1 w-12 bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput 
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    <FormInput 
                      label="Verified Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@organization.com"
                      type="email"
                      error={status === "error"}
                    />
                  </div>
                  
                  <FormInput 
                    label="Organization / Department"
                    name="org"
                    value={form.org}
                    onChange={handleChange}
                    placeholder="Agency or Independent Team"
                  />

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Access Requirement</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Provide context for your intelligence access request..."
                      rows={4}
                      required
                      className="input-field min-h-[120px] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="btn-primary w-full py-6 text-sm font-black tracking-[0.3em] shadow-[0_20px_50px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                  >
                    {status === "loading" ? "PROCESSING..." : status === "success" ? "REQUEST DRAFTED" : (
                      <span className="flex items-center justify-center gap-2">
                        INITIATE VERIFICATION <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>

                  {status === "success" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="p-6 bg-success/10 border border-success/20 rounded-xl text-success text-center">
                        <div className="font-bold flex items-center justify-center gap-2 mb-1">
                          <Check className="w-5 h-5" /> Request Package Ready
                        </div>
                        <p className="text-xs opacity-80 leading-relaxed">
                          A secure email has been drafted. Please complete the transmission <br />
                          to begin the multi-stage vetting process.
                        </p>
                      </div>

                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl text-center space-y-4">
                        <p className="text-[10px] text-muted uppercase tracking-widest font-bold">
                          If your email client didn&apos;t open:
                        </p>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all"
                        >
                          {copied ? (
                            <><Check className="w-3 h-3" /> COPIED TO CLIPBOARD</>
                          ) : (
                            <><Copy className="w-3 h-3" /> COPY REQUEST TO CLIPBOARD</>
                          )}
                        </button>
                        <p className="text-[10px] text-muted leading-relaxed">
                          Copy the text above and send it manually to <br />
                          <span className="text-white">vaylocorp@gmail.com</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm font-medium text-center flex items-center justify-center gap-2 animate-in shake">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      {errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-surface/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,58,0.02)_0%,transparent_80%)]" />
        <div className="max-w-4xl mx-auto relative">
          <div className="border border-error/20 bg-black/40 p-12 md:p-24 rounded-3xl relative text-center flex flex-col items-center">
            <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-error/20" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-error/20" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-error/20" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-error/20" />

            <div className="w-16 h-16 rounded-full bg-error/5 border border-error/10 flex items-center justify-center mb-10">
              <AlertTriangle className="w-8 h-8 text-error/60" />
            </div>

            <div className="space-y-6 mb-12">
              <h3 className="text-xs font-black text-error uppercase tracking-[0.5em] mb-4">
                Restricted Operational Notice
              </h3>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                UNAUTHORIZED ACCESS <br />
                <span className="text-white/30">IS PERMANENTLY LOGGED.</span>
              </h2>
              <p className="text-secondary text-sm md:text-base leading-relaxed font-bold max-w-2xl mx-auto italic opacity-60">
                Relay Intelligence services are strictly reserved for verified organizations and authorized 
                security professionals. Misrepresentation of identity is a violation of the Vaylo Protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full py-8 border-y border-white/5 text-left">
              <AdvisoryModule 
                icon={<Scale className="w-4 h-4" />}
                title="Jurisdictional"
                text="Fraud attempts are escalated to national cyber-defense bureaus."
              />
              <AdvisoryModule 
                icon={<ShieldAlert className="w-4 h-4" />}
                title="Attribution"
                text="Multi-stage verification for every operational entity is mandatory."
              />
            </div>

            <div className="mono text-[9px] text-error/40 font-black uppercase tracking-[0.4em] pt-8">
              Verification Required // 403 Forbidden Access
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, label, value, link }: { icon: React.ReactNode, label: string, value: string, link?: string }) {
  const Content = (
    <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-muted block mb-1">{label}</span>
        <span className="text-sm font-bold text-white tracking-tight">{value}</span>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} target={link.startsWith("http") ? "_blank" : undefined} className="block">
        {Content}
      </Link>
    );
  }

  return Content;
}

function CapabilityItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h5 className="text-sm font-bold text-white tracking-tight mb-1">{title}</h5>
        <p className="text-xs text-secondary leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function AdvisoryModule({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="space-y-2">
       <div className="flex items-center gap-2 text-error/60 font-black text-[10px] uppercase tracking-widest">
         {icon} {title}
       </div>
       <p className="text-[11px] text-white/40 leading-relaxed">
         {text}
       </p>
    </div>
  );
}

function FormInput({ label, name, value, onChange, placeholder, type = "text", error = false }: { 
  label: string, name: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, placeholder: string, type?: string, error?: boolean 
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`input-field ${error ? "border-error/40" : ""}`}
      />
    </div>
  );
}
