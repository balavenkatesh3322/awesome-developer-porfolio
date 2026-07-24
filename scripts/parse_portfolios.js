import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('readme_raw.md', 'utf8');
const lines = content.split('\n');

const entries = [];
let idCounter = 1;

function getHostPlatform(url) {
  const lower = url.toLowerCase();
  if (lower.includes('vercel.app')) return 'Vercel';
  if (lower.includes('netlify.app')) return 'Netlify';
  if (lower.includes('framer.website') || lower.includes('framer.app') || lower.includes('framer.media')) return 'Framer';
  if (lower.includes('github.io')) return 'GitHub Pages';
  if (lower.includes('is-a.dev')) return 'is-a.dev';
  if (lower.includes('github.com')) return 'GitHub Profile';
  if (lower.includes('webflow.io')) return 'Webflow';
  if (lower.includes('render.com')) return 'Render';
  if (lower.includes('hashnode.dev') || lower.includes('hashnode.me')) return 'Hashnode';
  if (lower.includes('medium.com')) return 'Medium';
  if (lower.includes('notion.site') || lower.includes('notion.so')) return 'Notion';
  if (lower.includes('wordpress.com') || lower.includes('wixsite.com')) return 'CMS Platform';
  return 'Custom Domain';
}

function determineCategory(roleStr, urlStr, nameStr) {
  const combined = (roleStr + ' ' + urlStr + ' ' + nameStr).toLowerCase();
  if (combined.includes('ai') || combined.includes('machine learning') || combined.includes('ml') || combined.includes('data scientist') || combined.includes('data engineer') || combined.includes('llm')) {
    return 'AI / Data Science';
  }
  if (combined.includes('frontend') || combined.includes('front-end') || combined.includes('ui') || combined.includes('react') || combined.includes('vue') || combined.includes('angular') || combined.includes('web developer')) {
    return 'Frontend';
  }
  if (combined.includes('full stack') || combined.includes('fullstack') || combined.includes('full-stack') || combined.includes('software engineer') || combined.includes('software developer')) {
    return 'Full Stack';
  }
  if (combined.includes('mobile') || combined.includes('flutter') || combined.includes('ios') || combined.includes('android') || combined.includes('react native')) {
    return 'Mobile App Dev';
  }
  if (combined.includes('ux') || combined.includes('designer') || combined.includes('product design') || combined.includes('creative')) {
    return 'UI/UX & Design';
  }
  if (combined.includes('backend') || combined.includes('back-end') || combined.includes('cloud') || combined.includes('devops') || combined.includes('system') || combined.includes('golang') || combined.includes('python')) {
    return 'Backend & Cloud';
  }
  return 'Software Engineer';
}

function extractTags(roleStr, urlStr, category) {
  const tags = new Set();
  const text = (roleStr + ' ' + urlStr).toLowerCase();
  
  if (category) tags.add(category);
  
  if (text.includes('react')) tags.add('React');
  if (text.includes('next')) tags.add('Next.js');
  if (text.includes('vue')) tags.add('Vue');
  if (text.includes('flutter')) tags.add('Flutter');
  if (text.includes('animated') || text.includes('animation') || text.includes('interactive')) tags.add('Animated');
  if (text.includes('ai') || text.includes('ml')) tags.add('AI/ML');
  if (text.includes('student') || text.includes('undergrad')) tags.add('Student');
  if (text.includes('lead') || text.includes('senior') || text.includes('sr')) tags.add('Senior');
  if (text.includes('freelance') || text.includes('freelancer')) tags.add('Freelance');
  if (text.includes('full stack') || text.includes('fullstack')) tags.add('Full Stack');
  if (text.includes('frontend')) tags.add('Frontend');
  if (text.includes('backend')) tags.add('Backend');
  if (text.includes('python')) tags.add('Python');
  if (text.includes('node') || text.includes('typescript')) tags.add('TypeScript');
  
  return Array.from(tags).slice(0, 4);
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

lines.forEach((line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('- [')) {
    const m = trimmed.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)(.*)/);
    if (m) {
      const rawName = m[1].trim();
      let rawUrl = m[2].trim();
      const rest = m[3].trim();
      
      if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        rawUrl = 'https://' + rawUrl;
      }
      
      let role = '';
      const roleMatch = rest.match(/\[([^\]]+)\]/);
      if (roleMatch) {
        role = roleMatch[1].trim();
      } else {
        // look for dash description
        const dashMatch = rest.match(/-\s*(.+)/);
        if (dashMatch) {
          role = dashMatch[1].trim();
        }
      }

      const hostPlatform = getHostPlatform(rawUrl);
      const category = determineCategory(role, rawUrl, rawName);
      const tags = extractTags(role, rawUrl, category);
      const initials = getInitials(rawName);
      
      let firstLetter = rawName[0].toUpperCase();
      if (!/[A-Z]/.test(firstLetter)) {
        firstLetter = '#';
      }

      entries.push({
        id: idCounter++,
        name: rawName,
        url: rawUrl,
        role: role || 'Software Developer',
        hostPlatform,
        category,
        tags,
        initials,
        firstLetter,
        featured: idCounter <= 24 // mark first batch as highlighted/featured defaults
      });
    }
  }
});

console.log(`Successfully extracted ${entries.length} portfolios!`);

const outDir = path.resolve('src/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'portfolios.json'), JSON.stringify(entries, null, 2));
console.log('Saved src/data/portfolios.json');
