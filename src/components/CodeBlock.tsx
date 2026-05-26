import { useState } from 'react';

const HIGHLIGHT_COMMENT = /←|highlight|주목|중요|important/i;

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const RULES_PYTHON = [
  { type: 'comment', re: /#.*$/gm },
  { type: 'string',  re: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
  { type: 'decorator', re: /@[\w.]+/g },
  { type: 'keyword', re: /\b(import|from|as|def|class|return|if|elif|else|for|while|try|except|finally|with|raise|yield|async|await|pass|break|continue|and|or|not|in|is|lambda|global|nonlocal|del|assert)\b/g },
  { type: 'builtin', re: /\b(True|False|None|self|cls|print|len|range|int|str|float|list|dict|set|tuple|type|isinstance|enumerate|zip|map|filter|super|open|input|sorted|reversed|any|all|min|max|sum|abs|round|format|hasattr|getattr|setattr)\b/g },
  { type: 'function', re: /\b([a-zA-Z_]\w*)\s*(?=\()/g },
  { type: 'number', re: /\b\d+(\.\d+)?\b/g },
  { type: 'operator', re: /([+\-*/%=<>!&|^~:]+|->|\.\.\.)/g },
];

const RULES_JS = [
  { type: 'comment', re: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm },
  { type: 'string',  re: /(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g },
  { type: 'keyword', re: /\b(import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|this|super|try|catch|finally|throw|async|await|yield|typeof|instanceof|void|delete|in|of)\b/g },
  { type: 'builtin', re: /\b(true|false|null|undefined|NaN|Infinity|console|window|document|Promise|Array|Object|String|Number|Boolean|Map|Set|JSON|Math|Date|RegExp|Error|Symbol|BigInt)\b/g },
  { type: 'function', re: /\b([a-zA-Z_$]\w*)\s*(?=\()/g },
  { type: 'number', re: /\b\d+(\.\d+)?\b/g },
  { type: 'operator', re: /([+\-*/%=<>!&|^~?:]+|=>|\.\.\.)/g },
];

const RULES_BASH = [
  { type: 'comment', re: /#.*$/gm },
  { type: 'string',  re: /("(?:\\.|[^"\\])*"|'[^']*')/g },
  { type: 'keyword', re: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|in|function|return|exit|export|source|local|readonly|declare|unset|shift|break|continue)\b/g },
  { type: 'builtin', re: /\b(echo|cd|ls|cat|grep|sed|awk|find|mkdir|rm|cp|mv|chmod|chown|curl|wget|pip|npm|npx|node|python|python3|git|docker|sudo|apt|brew|yarn|pnpm|bun|gh)\b/g },
  { type: 'function', re: /\$\{?\w+\}?/g },
  { type: 'number', re: /\b\d+\b/g },
  { type: 'operator', re: /([|&;<>]+|>>|&&|\|\|)/g },
];

const RULES_JSON = [
  { type: 'string',  re: /("(?:\\.|[^"\\])*")\s*(?=:)/g },
  { type: 'string',  re: /:\s*("(?:\\.|[^"\\])*")/g },
  { type: 'builtin', re: /\b(true|false|null)\b/g },
  { type: 'number', re: /\b-?\d+(\.\d+)?([eE][+-]?\d+)?\b/g },
];

function getRules(lang: string) {
  const l = (lang || '').toLowerCase();
  if (['python', 'py'].includes(l)) return RULES_PYTHON;
  if (['javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx'].includes(l)) return RULES_JS;
  if (['bash', 'sh', 'shell', 'zsh', 'terminal', 'console'].includes(l)) return RULES_BASH;
  if (['json', 'jsonc'].includes(l)) return RULES_JSON;
  return [
    { type: 'comment', re: /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm },
    { type: 'string',  re: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g },
    { type: 'keyword', re: /\b(import|from|export|const|let|var|function|def|class|return|if|else|for|while|try|catch|except|with|async|await|new|this|self)\b/g },
    { type: 'builtin', re: /\b(true|false|null|undefined|None|True|False)\b/g },
    { type: 'number', re: /\b\d+(\.\d+)?\b/g },
  ];
}

function tokenizeLine(line: string, rules: { type: string; re: RegExp }[]) {
  const tokens: { start: number; end: number; type: string; text: string }[] = [];
  for (const rule of rules) {
    const re = new RegExp(rule.re.source, rule.re.flags);
    let m;
    while ((m = re.exec(line)) !== null) {
      const text = m[1] !== undefined && rule.type !== 'comment' && rule.type !== 'keyword' && rule.type !== 'builtin' && rule.type !== 'decorator' ? m[1] : m[0];
      const start = m.index + (m[0].length - text.length);
      tokens.push({ start, end: start + text.length, type: rule.type, text });
    }
  }
  tokens.sort((a, b) => a.start - b.start || b.end - a.end);
  const filtered: typeof tokens = [];
  let lastEnd = 0;
  for (const t of tokens) {
    if (t.start >= lastEnd) {
      filtered.push(t);
      lastEnd = t.end;
    }
  }
  let result = '';
  let pos = 0;
  for (const t of filtered) {
    if (t.start > pos) result += escapeHtml(line.slice(pos, t.start));
    result += `<span class="token ${t.type}">${escapeHtml(t.text)}</span>`;
    pos = t.end;
  }
  if (pos < line.length) result += escapeHtml(line.slice(pos));
  return result;
}

function highlightCode(code: string, language: string) {
  const rules = getRules(language);
  const lines = code.split('\n');
  return lines.map((line) => {
    const isHighlight = HIGHLIGHT_COMMENT.test(line);
    const highlighted = tokenizeLine(line, rules);
    if (isHighlight) return `<span class="code-line-highlight">${highlighted}</span>`;
    return highlighted;
  }).join('\n');
}

export default function CodeBlock({ code, language = '' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const html = highlightCode(code, language);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <button className={`code-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="code-block-content">
        <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
      </div>
    </div>
  );
}
