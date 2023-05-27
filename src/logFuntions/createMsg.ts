export default function createMsg(varName: string, option?: string): string {
  let message;
  switch (option) {
    case "withtype":
      message = `console.log("${varName}: ", ${varName}, " with typeof: ", typeof ${varName}, "\\n");`;
      break;
    case "onlytype":
      message = `console.log("typeof ${varName}: ", typeof ${varName}, "\\n");`;
      break;
    default:
      message = `console.log("${varName}: ", ${varName}, "\\n");`;
  }
  return message;
}
