const cat2 = [
  "  /\\___/\\",
  "  )     (",
  "  =\\   /=",
  "  )   (",
  " /     \\",
  " )     (",
  "/       \\",
  "\\       /",
  " \\__ __/",
  "    ))",
  "    //",
  "    ((",
  "    \\)",
];

const cat = [
  "                          ,",
  "  ,-.       _,---._ __  / \\",
  " /  )    .-'       `./ /   \\",
  "(  (   ,'            `/    /|",
  " \\  `-'             \\'\\   / |",
  "  `.              ,  \\ \\ /  |",
  "   /`.          ,'-`----Y   |",
  "  (            ;        |   '",
  "  |  ,-.    ,-'         |  /",
  "  |  | (   |            | /",
  "  )  |  \\  `.___________|/",
  "  `--'   `--'",
];

function normalizeLines(text: string): string[] {
  const lines = text.split(/\r?\n/);
  while (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}

function padVertical(lines: string[], height: number): string[] {
  const pad = height - lines.length;
  if (pad <= 0) {
    return [...lines];
  }
  const top = Math.floor(pad / 2);
  const bottom = pad - top;
  return [
    ...Array.from({ length: top }, () => ''),
    ...lines,
    ...Array.from({ length: bottom }, () => ''),
  ];
}

function maxWidth(lines: string[]): number {
  return lines.reduce((max, line) => Math.max(max, line.length), 0);
}

export function addCatsToAscii(art: string): string {
  const centerLines = normalizeLines(art);
  const totalHeight = Math.max(centerLines.length, cat.length, cat2.length);
  const leftLines = padVertical(cat, totalHeight);
  const rightLines = padVertical(cat2, totalHeight);
  const middleLines = padVertical(centerLines, totalHeight);

  const leftWidth = maxWidth(leftLines);
  const middleWidth = maxWidth(middleLines);
  const gap = '  ';

  const combined: string[] = [];
  for (let i = 0; i < totalHeight; i += 1) {
    const left = (leftLines[i] ?? '').padEnd(leftWidth, ' ');
    const middle = (middleLines[i] ?? '').padEnd(middleWidth, ' ');
    const right = rightLines[i] ?? '';
    combined.push(`${left}${gap}${middle}${gap}${right}`.trimEnd());
  }

  return combined.join('\n');
}

