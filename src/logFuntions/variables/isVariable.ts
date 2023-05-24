export default function isVariable(varDef: string): boolean {
  const VarPattern1: RegExp =
    /^(?:const\s+|let\s+|var\s+)?\s*([a-zA-Z0-9_]+)\s*(?:(?:\:.*\S+)|(?:\??\.[a-zA-Z_0-9]+\(\))|(?:\=.+))/g;
  const varPattern2: RegExp = /^(let|var)\s+[a-zA-Z0-9_]+;?/g;

  return VarPattern1.test(varDef) || varPattern2.test(varDef);
}
