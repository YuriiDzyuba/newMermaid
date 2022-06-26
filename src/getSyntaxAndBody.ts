export function getSyntaxAndBody (mdr) {
  const textRow = mdr.split(`\n`);
  const [syntax, ...body] = textRow.map((e) => e.trim());

  return {
    syntax: syntax.toString(),
    body }
}