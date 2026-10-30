const fs = require('fs');

const html = fs.readFileSync('NEETBuddy.html', 'utf8');

function extractVar(varName, startSearchPos = 0) {
  const pStart = html.indexOf('const ' + varName + '=', startSearchPos);
  if (pStart === -1) {
    const pAlt = html.indexOf(varName + '=', startSearchPos);
    if (pAlt === -1) return null;
  }
  const actualStart = html.indexOf(varName + '=', startSearchPos) + varName.length + 1;
  
  // Find where it ends - balance brackets or look for semicolon at top level
  // Or evaluate JS snippet
  let end = actualStart;
  const firstChar = html[actualStart];
  if (firstChar === '[' || firstChar === '{') {
    let stack = [firstChar];
    let inString = false;
    let stringChar = '';
    let escaped = false;
    for (let i = actualStart + 1; i < html.length; i++) {
      const c = html[i];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (c === '\\') {
          escaped = true;
        } else if (c === stringChar) {
          inString = false;
        }
      } else {
        if (c === '"' || c === "'" || c === '`') {
          inString = true;
          stringChar = c;
        } else if (c === '[' || c === '{') {
          stack.push(c);
        } else if (c === ']') {
          if (stack[stack.length - 1] === '[') stack.pop();
          if (stack.length === 0) {
            end = i + 1;
            break;
          }
        } else if (c === '}') {
          if (stack[stack.length - 1] === '{') stack.pop();
          if (stack.length === 0) {
            end = i + 1;
            break;
          }
        }
      }
    }
  } else {
    end = html.indexOf(';', actualStart);
  }

  const raw = html.slice(actualStart, end).trim();
  return { raw, start: actualStart, end };
}

// Extract SUB
const subData = extractVar('SUB');
const SUB = new Function('return ' + subData.raw)();

// Extract CH
const chData = extractVar('CH');
const CH = new Function(`
  const L = (a, b) => [...a.map(n => [n, 11]), ...b.map(n => [n, 12])];
  return ${chData.raw};
`)();

// Extract TP
const tpData = extractVar('TP');
const TP = new Function('return ' + tpData.raw)();

// Extract QB
const qbData = extractVar('QB');
const QB = new Function(`
  const R = (s, c, t, q, o, a, e, m, im) => ({ s, c, t, q, o, a, e, m: m || '', im: im || '' });
  const LW = 'The Living World', BC = 'Biological Classification', PK = 'Plant Kingdom', NL = 'Newton’s Laws and Force';
  return ${qbData.raw};
`)();

// Extract PDFQB
const pdfqbData = extractVar('PDFQB');
const PDFQB = new Function('return ' + pdfqbData.raw)();

// Extract IMG
const pHier = html.indexOf('const hierSvg=');
const pFlash = html.indexOf('const flashCardCount=');
const hierCode = html.slice(pHier, pFlash);
const imgData = extractVar('IMG');
const IMG = new Function(`
  ${hierCode}
  return ${imgData.raw};
`)();

// Extract NOTES
const notesData = extractVar('NOTES', 405000);
const NOTES = new Function('return ' + notesData.raw)();

// Extract CHD
const chdData = extractVar('CHD', 413000);
const CHD = new Function('return ' + chdData.raw)();

// Extract FM
const fmData = extractVar('FM', 400000);
let FM = [];
if (fmData) {
  FM = new Function('return ' + fmData.raw)();
}

console.log('--- EXTRACTION SUCCESSFUL ---');
console.log('Subjects:', SUB.map(s => s.n));
console.log('Physics chapters:', CH.ph.length);
console.log('Chemistry chapters:', CH.ch.length);
console.log('Biology chapters:', CH.bi.length);
console.log('Handcrafted Questions (QB):', QB.length);
console.log('PDF Questions (PDFQB):', PDFQB.length);
console.log('Total Questions:', QB.length + PDFQB.length);
console.log('Notes Chapters:', Object.keys(NOTES));
console.log('Diagrams (IMG):', Object.keys(IMG));
console.log('Formula Count:', FM.length);

// Save comprehensive data package
const dataset = {
  SUB,
  CH,
  TP,
  QB,
  PDFQB,
  NOTES,
  IMG,
  CHD,
  FM
};

fs.writeFileSync('public_dataset.json', JSON.stringify(dataset, null, 2));
console.log('Saved public_dataset.json (' + (fs.statSync('public_dataset.json').size / 1024).toFixed(1) + ' KB)');
