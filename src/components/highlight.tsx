/** Instagram-style marker. `**blue**` is the main wash highlight, `==yellow==` is the small accent. */
export function Highlighted({ text }: { text: string }) {
  if (!text.includes("**") && !text.includes("==")) return text;

  return (
    <span>
      {text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark key={i} className="hl">
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <mark key={i} className="hl-yellow">
              {part.slice(2, -2)}
            </mark>
          );
        }
        return part;
      })}
    </span>
  );
}
