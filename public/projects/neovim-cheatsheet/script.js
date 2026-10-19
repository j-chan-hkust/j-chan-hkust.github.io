// Braces mark user-supplied inputs, rendered in italics. Other keys are literal.
// Beginner selection: Neovim Tutor and manual chapters 02–04, plus everyday
// file/window commands used to switch files and navigate help.
const beginnerColumns = [
  [
    ['Move', 'Normal', [
      ['h j k l', '← left ↓ down ↑ up → right'],
      ['w / b', 'Next / previous word start'],
      ['e / ge', 'Next / previous word end'],
      ['W / B', 'Next / previous WORD ¹'],
      ['0 / $', 'Start / end of line'],
      ['^', 'First non-blank on line'],
      ['f{char}', 'Find character to the right'],
      ['F{char}', 'Find character to the left'],
      ['t{char}', 'Stop before character to right'],
      ['; / ,', 'Repeat find / reverse find'],
    ]],
    ['Jump & scroll', 'Normal', [
      ['gg / G', 'First / last line of file'],
      ['{line}G', 'Go to line number'],
      ['%', 'Matching bracket: () [] {}'],
      ['{ / }', 'Previous / next paragraph'],
      ['Ctrl+d', 'Scroll down half a screen'],
      ['Ctrl+u', 'Scroll up half a screen'],
      ['zz', 'Center cursor line on screen'],
      ['Ctrl+o', 'Back to older jump position'],
      ['Ctrl+i', 'Forward in jump history'],
    ]],
    ['Search', 'Normal', [
      ['/{text}', 'Search forward'],
      ['?{text}', 'Search backward'],
      ['n / N', 'Repeat / reverse search'],
      ['* / #', 'Find this word: next / prev'],
      [':noh', 'Clear highlighted matches'],
      ['/{text}\\c', 'Search, ignoring case'],
      ['Esc', 'Cancel an unfinished search'],
    ]],
  ],
  [
    ['Insert & replace', 'Normal → Insert', [
      ['i / a', 'Insert before / after cursor'],
      ['I', 'Insert at first non-blank'],
      ['A', 'Insert at end of line'],
      ['o / O', 'New line below / above; insert'],
      ['Esc', 'Return to Normal mode'],
      ['r{char}', 'Replace one character'],
      ['R', 'Overwrite until Esc'],
      ['s', 'Change one character'],
    ]],
    ['Delete & change', 'Normal', [
      ['x / X', 'Delete char at / before cursor'],
      ['dd', 'Cut whole line'],
      ['dw', 'Delete to next word start'],
      ['de', 'Delete through word end'],
      ['D / d$', 'Delete to end of line'],
      ['cw', 'Change to word end'],
      ['cc', 'Change line; keep indent'],
      ['C / c$', 'Change to end of line'],
      ['J', 'Join next line with a space'],
    ], 'Change deletes text and enters Insert mode.'],
    ['Undo, repeat & counts', 'Normal', [
      ['u', 'Undo last change'],
      ['Ctrl+r', 'Redo undone change'],
      ['.', 'Repeat last text change'],
      ['{count}{motion}', 'Repeat a movement'],
      ['5j', 'Move down 5 lines'],
      ['3dd', 'Cut 3 lines'],
      ['d2w', 'Delete across 2 words'],
      ['2p', 'Paste twice'],
    ]],
  ],
  [
    ['Copy & paste', 'Normal', [
      ['yy', 'Copy (yank) whole line'],
      ['yw', 'Copy to next word start'],
      ['y$', 'Copy to end of line'],
      ['p / P', 'Paste after / before cursor'],
      ['"+yy', 'Copy line to clipboard ²'],
      ['"+p', 'Paste from clipboard ²'],
    ], 'Linewise text pastes below / above the line.'],
    ['Select & indent', 'Visual', [
      ['v', 'Select text; move to extend'],
      ['V', 'Select whole lines'],
      ['Ctrl+v', 'Select a rectangular block'],
      ['o', 'Other end of selection'],
      ['y / d', 'Copy / cut selection'],
      ['c', 'Change selected text'],
      ['> / <', 'Indent / unindent selection'],
      ['Esc', 'Cancel selection'],
      ['gv', 'Reselect last text (Normal)'],
      ['>> / <<', 'Indent / unindent (Normal)'],
    ]],
    ['Operators & text objects', 'Normal', [
      ['d{motion}', 'Delete over a movement'],
      ['c{motion}', 'Change over a movement'],
      ['y{motion}', 'Copy over a movement'],
      ['diw / ciw', 'Delete / change entire word'],
      ['daw', 'Delete word + adjacent space'],
      ['ci" / ci\'', 'Change inside "…" / \'…\''],
      ['ci( / ci{', 'Change inside (…) / {…}'],
      ['viw', 'Select entire word'],
      ['vip', 'Select paragraph'],
    ]],
  ],
  [
    ['Files & buffers', 'Command · Enter to run', [
      [':w', 'Save file'],
      [':q', 'Close window; quit if last'],
      [':wq', 'Save and close window'],
      [':q!', 'Close without saving changes'],
      [':e {file}', 'Open file'],
      [':w {file}', 'Write copy to filename'],
      [':ls', 'List open buffers'],
      [':bn / :bp', 'Next / previous buffer'],
      [':b {number}', 'Switch to buffer number'],
      [':bd', 'Close current buffer'],
      [':e!', 'Reload file; discard changes'],
    ]],
    ['Find & replace', 'Command · Enter to run', [
      [':s/{old}/{new}/', 'Replace first match on line'],
      [':s/{old}/{new}/g', 'Replace all matches on line'],
      [':%s/{old}/{new}/gc', 'Replace in file; confirm each'],
      ['y / n / q', 'Confirm: yes / skip / stop'],
    ]],
    ['Windows & help', 'Normal unless :', [
      [':sp / :vsp', 'Split above / to the left'],
      ['Ctrl+w w', 'Switch to next window'],
      ['Ctrl+w h/j/k/l', 'Window left / down / up / right'],
      ['Ctrl+w q', 'Close current window'],
      ['Ctrl+w =', 'Make windows equal size'],
      [':help {topic}', 'Read help for a key or topic'],
      [':Tutor', 'Open the beginner tutorial'],
    ], '¹ WORD = non-whitespace text. ² Clipboard needs provider support. Zed mappings may differ.'],
  ],
];

const sheet = document.querySelector('#sheet');
const toggle = document.querySelector('#all-toggle');

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}

function normalizeKey(key) {
  return key.replace(/CTRL-SHIFT-([A-Z])/g, (_, char) => `Ctrl+Shift+${char.toLowerCase()}`)
    .replace(/CTRL-([A-Z])/g, (_, char) => `Ctrl+${char.toLowerCase()}`)
    .replace(/CTRL-/g, 'Ctrl+').replace(/<CR>/g, 'Enter').replace(/<Esc>/g, 'Esc')
    .replace(/\["x\]/g, '["{register}]');
}

function formatKey(key) {
  return escapeHtml(normalizeKey(key))
    .replace(/\{([a-zA-Z][a-zA-Z0-9 _-]*)\}/g, '<em>$1</em>')
    .replace(/\[count\]/g, '<em>count</em>')
    .replace(/ \/ /g, '<span class="slash">/</span>');
}

function cardHtml([title, mode, rows, note]) {
  const activeMode = mode.includes('Insert') ? 'insert' : mode.split(' ')[0].toLowerCase();
  const modeLabel = escapeHtml(mode).replace(/Normal|Insert|Visual|Command|Replace|Terminal/g, name => `<span data-mode="${name.toLowerCase()}">${name}</span>`);
  return `<section class="card" data-mode="${activeMode}"><div class="card-heading"><h2>${escapeHtml(title)}</h2><span class="mode">${modeLabel}</span></div><dl>${rows.map(([key, description]) => {
    const visibleKey = normalizeKey(key).replace(/\{([a-zA-Z][a-zA-Z0-9 _-]*)\}/g, '$1');
    const wide = visibleKey.length > 12;
    return `<div class="shortcut${wide ? ' wide' : ''}"><dt><kbd>${formatKey(key)}</kbd></dt><dd>${escapeHtml(description)}</dd></div>`;
  }).join('')}</dl>${note ? `<p class="card-note">${escapeHtml(note)}</p>` : ''}</section>`;
}

function expandedColumns() {
  const columns = beginnerColumns.map(column => [...column]);
  const weights = columns.map(column => column.reduce((sum, section) => sum + section[2].length, 0));
  const alreadyShown = new Set(beginnerColumns.flat().flatMap(section => section[2].flatMap(([key]) => key.split(' / ').map(key => `${key.startsWith(':') ? 'Command' : section[1].split(' → ')[0]}:${normalizeKey(key)}`))));
  for (const group of NEOVIM_COMMANDS) {
    const rows = group.rows.filter(([key]) => !alreadyShown.has(`${group.mode}:${normalizeKey(key)}`));
    // Short cards keep the same key/description layout even for the full index.
    for (let offset = 0; offset < rows.length; offset += 16) {
      const batch = rows.slice(offset, offset + 16);
      const title = rows.length > 16 ? `${group.title} · ${Math.floor(offset / 16) + 1}` : group.title;
      const column = weights.indexOf(Math.min(...weights));
      columns[column].push([title, group.mode, batch]);
      weights[column] += batch.reduce((sum, [key, description]) => sum + 1 + Math.floor(description.length / 25) + (key.length > 12 ? 1 : 0), 2);
    }
  }
  return columns;
}

function render() {
  sheet.classList.toggle('all', toggle.checked);
  const columns = toggle.checked ? expandedColumns() : beginnerColumns;
  sheet.innerHTML = columns.map(column => `<div class="column">${column.map(cardHtml).join('')}</div>`).join('');
  window.scrollTo(0, 0);
}

toggle.addEventListener('change', render);
render();
