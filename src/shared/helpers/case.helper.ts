export function lowerCaseFirstLetter(sentence: string): string {
  if (sentence.length === 0) return sentence;
  return sentence.charAt(0).toLocaleLowerCase() + sentence.slice(1);
}
