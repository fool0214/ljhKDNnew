const sharp = require('sharp');
const path = require('path');

const W = 1200;
const H = 630;

// Navy editorial palette
const NAVY_900 = '#0A1428';
const NAVY_800 = '#1B2A4A';
const GOLD = '#3D6FE0';
const GOLD_LIGHT = '#5B8AF0';

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY_900}"/>
      <stop offset="60%" stop-color="${NAVY_800}"/>
      <stop offset="100%" stop-color="#24365C"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_LIGHT}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorative circle (top-right) -->
  <circle cx="1050" cy="80" r="280" fill="${GOLD}" opacity="0.04"/>
  <circle cx="1080" cy="50" r="180" fill="${GOLD}" opacity="0.03"/>

  <!-- Decorative circle (bottom-left) -->
  <circle cx="100" cy="600" r="200" fill="${GOLD}" opacity="0.03"/>

  <!-- Grid pattern overlay -->
  <line x1="400" y1="0" x2="400" y2="${H}" stroke="white" stroke-width="0.3" opacity="0.04"/>
  <line x1="800" y1="0" x2="800" y2="${H}" stroke="white" stroke-width="0.3" opacity="0.04"/>
  <line x1="0" y1="210" x2="${W}" y2="210" stroke="white" stroke-width="0.3" opacity="0.04"/>
  <line x1="0" y1="420" x2="${W}" y2="420" stroke="white" stroke-width="0.3" opacity="0.04"/>

  <!-- Top-left branding eyebrow -->
  <rect x="72" y="60" width="32" height="3" fill="url(#accent)" rx="1"/>
  <text x="72" y="92" fill="${GOLD}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" letter-spacing="3">DREAMIT BIZ</text>

  <!-- Main title -->
  <text x="72" y="240" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" letter-spacing="-1">DASCO</text>
  <text x="72" y="320" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" letter-spacing="-1">AI Academy</text>

  <!-- Korean subtitle -->
  <text x="72" y="380" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif" font-size="24" font-weight="400">다스코(주) 생성형 인공지능 업무 활용 교육</text>

  <!-- Accent line -->
  <rect x="72" y="410" width="100" height="4" fill="url(#accent)" rx="2"/>

  <!-- Bottom tags -->
  <rect x="72" y="470" width="120" height="36" rx="6" fill="rgba(61,111,224,0.15)" stroke="${GOLD}" stroke-width="1"/>
  <text x="132" y="494" fill="${GOLD}" font-family="Arial, sans-serif" font-size="14" font-weight="700" text-anchor="middle">Curriculum</text>

  <rect x="208" y="470" width="140" height="36" rx="6" fill="rgba(61,111,224,0.15)" stroke="${GOLD}" stroke-width="1"/>
  <text x="278" y="494" fill="${GOLD}" font-family="Arial, sans-serif" font-size="14" font-weight="700" text-anchor="middle">Prompt Eng.</text>

  <rect x="364" y="470" width="120" height="36" rx="6" fill="rgba(61,111,224,0.15)" stroke="${GOLD}" stroke-width="1"/>
  <text x="424" y="494" fill="${GOLD}" font-family="Arial, sans-serif" font-size="14" font-weight="700" text-anchor="middle">AI Practice</text>

  <!-- Bottom URL -->
  <text x="72" y="580" fill="rgba(255,255,255,0.4)" font-family="monospace" font-size="16" letter-spacing="1">dasco.dreamitbiz.com</text>

  <!-- Right side: large decorative number -->
  <text x="850" y="520" fill="rgba(255,255,255,0.03)" font-family="Arial, Helvetica, sans-serif" font-size="320" font-weight="900">AI</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accent)"/>
</svg>`;

(async () => {
  const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outPath);

  const stats = require('fs').statSync(outPath);
  console.log(`OG image generated: ${outPath}`);
  console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`Dimensions: ${W}x${H}`);
})();
