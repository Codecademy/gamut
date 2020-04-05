export const truncateText = (
  text: string,
  charsPerLine: number,
  lines: number
) => {
  const totalChars = charsPerLine * lines;
  if (text.length < totalChars) {
    return text;
  }

  const allSentences = text.split('.  ');
  const allLines = [];
  let filledAllSpace = false;
  let onLastLine = false;
  let currentLine = '';

  for (let i = 0; i < allSentences.length; i += 1) {
    const allWords = allSentences[i].split(' ');
    for (let w = 0; w < allWords.length; w += 1) {
      const word = allWords[w];

      if (filledAllSpace) {
        break;
      }
      let affix = ' ';
      let suffix = '';

      if (w === 0) {
        affix = '';
      }
      if (w === 0 && i === 0) {
        affix = '  ';
      }
      if (w === allWords.length) {
        suffix = '.';
      }

      const constructedWord = `${affix}${word}${suffix}`;
      const buffer = onLastLine ? 3 : 0;
      const needsNewLine =
        currentLine.length + constructedWord.length + buffer > charsPerLine;

      if (needsNewLine && !filledAllSpace) {
        allLines.push(currentLine);
        currentLine = constructedWord;
      } else {
        currentLine += constructedWord;
      }

      filledAllSpace = allLines.length === lines;
      onLastLine = allLines.length - lines === 1;
    }
  }
  if (!filledAllSpace && currentLine.length) {
    allLines.push(currentLine);
  }

  return allLines.join('');
};

export const generateContainerId = () =>
  `notification-text-${Math.floor(Math.random() * 100000)}`;
