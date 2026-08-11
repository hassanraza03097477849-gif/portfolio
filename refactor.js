const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace import { adminDb, adminAuth, adminStorage } ...
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]@\/lib\/firebase\/admin['"]/g, (match, p1) => {
    let newImports = p1.split(',').map(s => s.trim());
    newImports = newImports.map(imp => {
      if (imp === 'adminDb') return 'getAdminDb';
      if (imp === 'adminAuth') return 'getAdminAuth';
      if (imp === 'adminStorage') return 'getAdminStorage';
      return imp;
    });
    return `import { ${newImports.join(', ')} } from '@/lib/firebase/admin'`;
  });

  // Replace usage
  content = content.replace(/\badminDb\b(?!\s*={1,3}|\s*:)/g, 'getAdminDb()');
  content = content.replace(/\badminAuth\b(?!\s*={1,3}|\s*:)/g, 'getAdminAuth()');
  content = content.replace(/\badminStorage\b(?!\s*={1,3}|\s*:)/g, 'getAdminStorage()');

  // Fix the admin.ts file itself, since it was modified by the above logic
  if (file === 'src/lib/firebase/admin.ts') {
    return; // Don't modify admin.ts with this script, I will do it manually
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
