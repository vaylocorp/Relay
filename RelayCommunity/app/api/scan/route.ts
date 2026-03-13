import { NextRequest, NextResponse } from 'next/server';

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20; 
const rateMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim().slice(0, 150);
}

const PLATFORMS: Record<string, string> = {
  'GitHub': 'https://github.com/',
  'X / Twitter': 'https://twitter.com/',
  'Instagram': 'https://instagram.com/',
  'LinkedIn': 'https://linkedin.com/in/',
  'Reddit': 'https://reddit.com/user/',
  'TikTok': 'https://tiktok.com/@',
  'YouTube': 'https://youtube.com/@',
  'Twitch': 'https://twitch.tv/',
  'Telegram': 'https://t.me/',
  'Facebook': 'https://facebook.com/',
  'Mastodon': 'https://mastodon.social/@',
  'GitLab': 'https://gitlab.com/',
  'StackOverflow': 'https://stackoverflow.com/users/search?q=',
  'Pinterest': 'https://pinterest.com/',
  'Medium': 'https://medium.com/@'
};

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { 
      method: 'GET', 
      headers: { 'User-Agent': 'Mozilla/5.0 (Relay-OSINT-Validator)' },
      next: { revalidate: 3600 } 
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Wait 60s.' }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  const s = (k: string) => sanitize(body[k]);
  const firstName = s('firstName');
  const surname = s('surname');
  const email = s('email');
  const targetIp = s('ip');
  const domain = s('domain');
  const organization = s('organization');
  
  const serpKey = s('serpApiKey');
  const shodanKey = s('shodanKey');
  const vtKey = s('vtKey');
  const hibpKey = s('hibpKey');

  let usernames: any[] = Array.isArray(body.usernames) ? body.usernames.map((u: any) => ({
    value: sanitize(u?.value),
    platform: sanitize(u?.platform) || 'General'
  })).filter((u: any) => u.value.length > 0) : [];

  if (usernames.length === 0 && firstName && surname) {
    const p1 = `${firstName.toLowerCase()}${surname.toLowerCase()}`;
    const p2 = `${firstName.toLowerCase()}.${surname.toLowerCase()}`;
    const p3 = `${firstName.toLowerCase()}_${surname.toLowerCase()}`;
    
    [p1, p2, p3].forEach(p => {
      usernames.push({ value: p, platform: 'General', type: 'Heuristic' });
    });
  }

  const results = {
    findings: [] as any[],
    profiles: [] as any[],
    correlations: [] as any[],
    sources: [] as any[]
  };

  if (targetIp && /^(\d{1,3}\.){3}\d{1,3}$/.test(targetIp)) {
    try {
      const ipRes = await fetch(`http://ip-api.com/json/${targetIp}?fields=status,message,country,city,isp,as,mobile,proxy`);
      const ipData = await ipRes.json();
      if (ipData.status === 'success') {
        results.findings.push({ label: 'Network Origin', value: `${ipData.city}, ${ipData.country}`, severity: 'info' });
        results.findings.push({ label: 'ISP/Provider', value: ipData.isp, severity: 'info' });
        if (ipData.proxy) results.findings.push({ label: 'Security Mask', value: 'VPN/Proxy Detected', severity: 'medium' });
      }
    } catch {}
    
    results.sources.push({ title: `BGP Route: ${targetIp}`, url: `https://bgp.he.net/ip/${targetIp}`, category: 'Infrastructure' });
  }

  const foundHandles = new Set<string>();

  for (const u of usernames) {
    const checkPlatforms = ['GitHub', 'Reddit', 'GitLab', 'Medium'];
    
    for (const p of checkPlatforms) {
      if (u.platform === 'General' || u.platform === p) {
        let isFound = false;
        const profileUrl = `${PLATFORMS[p]}${u.value}`;

        if (p === 'GitHub') {
          try {
            const ghRes = await fetch(`https://api.github.com/users/${u.value}`, { headers: { 'User-Agent': 'Relay' } });
            if (ghRes.ok) {
              const ghData = await ghRes.json();
              isFound = true;
              results.findings.push({ label: 'Identity Verified', value: `Active GitHub user: ${ghData.name || u.value}`, severity: 'high' });
              if (ghData.bio) results.correlations.push({ type: 'Profile Evidence', detail: `Bio Match: "${ghData.bio.slice(0, 50)}..."` });
            }
          } catch {}
        } else {
          isFound = await checkUrl(profileUrl);
        }

        if (isFound) {
          foundHandles.add(u.value);
          results.profiles.push({ platform: p, url: profileUrl, status: 'VERIFIED' });
        } else if (u.type !== 'Heuristic') {
          results.profiles.push({ platform: p, url: profileUrl, status: 'ABSENT/PRIVATE' });
        }
      }
    }

    const socialPlatforms = ['LinkedIn', 'Instagram', 'TikTok', 'X / Twitter'];
    socialPlatforms.forEach(p => {
      if (u.platform === 'General' || u.platform === p) {
        results.profiles.push({ 
          platform: p, 
          url: `${PLATFORMS[p]}${u.value}`, 
          status: 'UNVERIFIED LINK' 
        });
      }
    });

    results.sources.push({ title: `Common Index: ${u.value}`, url: `https://www.google.com/search?q=%22${u.value}%22`, category: 'Public index' });
  }

  if (domain && /^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(domain)) {
     results.sources.push({ title: `CT Logs: ${domain}`, url: `https://crt.sh/?q=${domain}`, category: 'Transparency' });
     results.sources.push({ title: `DNS Map: ${domain}`, url: `https://dnsdumpster.com/?q=${domain}`, category: 'Passive Recon' });
  }

  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    results.findings.push({ label: 'Target Pivot', value: `Investigating ${email}`, severity: 'info' });
    results.sources.push({ title: `EPIEOS Search`, url: `https://epieos.com/?q=${email}`, category: 'Intelligence' });

    if (hibpKey) {
       try {
         const hibpRes = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
           headers: { 'hibp-api-key': hibpKey, 'user-agent': 'Relay' }
         });
         if (hibpRes.ok) {
           const breaches = await hibpRes.json();
           results.findings.push({ label: 'Data Exposure', value: `${breaches.length} leaks detected`, severity: 'high' });
         }
       } catch {}
    }
  }

  if (foundHandles.size > 0 && firstName && surname) {
    results.correlations.push({ 
      type: 'Cross-Node Linkage', 
      detail: `High confidence: Active profile "${Array.from(foundHandles)[0]}" matches name "${firstName} ${surname}".` 
    });
  }

  if (organization) {
    results.findings.push({ label: 'Affiliation', value: organization, severity: 'info' });
  }

  results.findings.push({ 
    label: 'Engine Status', 
    value: 'Community Edition: Heuristic accuracy may be limited.', 
    severity: 'low' 
  });

  return NextResponse.json(results);
}
