const fs = require('fs');
const content = fs.readFileSync('d:/SI/Sistem-Lab-Budaya-Digital/warisan-budaya-frontend/app/(main)/dosen/[id]/page.tsx', 'utf8');

const regex = /<\/?([a-zA-Z0-9]+)(?:\s+[^>]*?)?>/g;
let match;
const stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let lineMatch;
  const lineRegex = /<\/?([a-zA-Z0-9]+)(?:\s+[^>]*?)?(?:\/)?>/g;
  while ((lineMatch = lineRegex.exec(line)) !== null) {
    const fullTag = lineMatch[0];
    const tagName = lineMatch[1];
    
    // Ignore self-closing tags (ending with />)
    if (fullTag.endsWith('/>')) {
      continue;
    }
    
    if (fullTag.startsWith('</')) {
      if (stack.length === 0) {
        console.log(`Error: Extra closing tag </${tagName}> at line ${i + 1}`);
      } else {
        const top = stack.pop();
        if (top.name !== tagName) {
          console.log(`Error: Mismatched tag: opened <${top.name}> at line ${top.line}, but closed </${tagName}> at line ${i + 1}`);
        }
      }
    } else {
      stack.push({ name: tagName, line: i + 1 });
    }
  }
}

if (stack.length > 0) {
  console.log("Unclosed tags remaining on stack:");
  stack.forEach(t => console.log(`  <${t.name}> opened at line ${t.line}`));
} else {
  console.log("All tags matched perfectly!");
}
