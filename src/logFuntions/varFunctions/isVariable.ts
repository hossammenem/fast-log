export default function isVariable(varDef: string): boolean {
  const pattern1: RegExp =
    /^(export\s+)?(const\s+|let\s+|var\s+)([a-zA-Z_0-9]+)\s*(?:\:.*)?(?:\=.*)?\;?$/g;
  const pattern2: RegExp = /^(let|var)\s+[a-zA-Z0-9_]+;?/g;
  const partter3: RegExp = /^([a-zA-Z_0-9]+)\??\.[a-zA-Z_0-9]+\(.*\)\;?$/g;

  return (
    pattern1.test(varDef) || pattern2.test(varDef) || partter3.test(varDef)
  );
}
