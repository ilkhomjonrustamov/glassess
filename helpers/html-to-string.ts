export function convertHtmltoString(html: string) {
  const oldhtml = html;

  const convertedString = oldhtml.replace(/<[^>]+>/g, "");

  return convertedString;
}
