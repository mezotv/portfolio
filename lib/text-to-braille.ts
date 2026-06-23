const braille: Record<string, string> = {
  a: "⠁",
  b: "⠃",
  c: "⠉",
  d: "⠙",
  e: "⠑",
  f: "⠋",
  g: "⠛",
  h: "⠓",
  i: "⠊",
  j: "⠚",
  k: "⠅",
  l: "⠇",
  m: "⠍",
  n: "⠝",
  o: "⠕",
  p: "⠏",
  q: "⠟",
  r: "⠗",
  s: "⠎",
  t: "⠞",
  u: "⠥",
  v: "⠧",
  w: "⠺",
  x: "⠭",
  y: "⠽",
  z: "⠵",
  " ": " ",
  ".": "⠲",
  ",": "⠂",
  "?": "⠦",
  "!": "⠖",
};

export function textToBraille(text: string): string {
  return [...text]
    .map((char) => {
      const lower = char.toLowerCase();
      const value = braille[lower] ?? char;

      return char !== lower && braille[lower] ? `⠠${value}` : value;
    })
    .join("");
}

export function getBrailleCharacters(text: string) {
  const seen = new Map<string, number>();

  return [...textToBraille(text)].map((char) => {
    const occurrence = seen.get(char) ?? 0;
    seen.set(char, occurrence + 1);

    return {
      char,
      key: `${char}-${occurrence}`,
    };
  });
}
