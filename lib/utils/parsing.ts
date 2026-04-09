
export const extractCode = (text: string): string | null => {
  // 1. Try extracting from markdown code blocks with html tag
  const matchHtml = text.match(/```html\s*([\s\S]*?)\s*```/);
  if (matchHtml && matchHtml[1]) return matchHtml[1];

  // 2. Try extracting from generic code blocks if they look like HTML
  const matchGeneric = text.match(/```\s*([\s\S]*?)\s*```/);
  if (matchGeneric && matchGeneric[1] && matchGeneric[1].includes('<!DOCTYPE html>')) {
      return matchGeneric[1];
  }

  // 3. Fallback: Look for raw HTML structure start/end tags regardless of markdown
  const htmlStart = text.indexOf('<!DOCTYPE html>');
  const htmlEnd = text.lastIndexOf('</html>');

  if (htmlStart !== -1 && htmlEnd !== -1) {
      return text.substring(htmlStart, htmlEnd + 7);
  }

  return null;
};
