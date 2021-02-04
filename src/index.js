import { defaultSheet } from "./sheet";
import spacingCase from "./spacing.case";
import fontCase from "./font.case";
import widthCase from "./width.case";
import flexCase from "./flex.case";

console.time("rulesInit");
[
  spacingCase.install,
  fontCase.install,
  widthCase.install,
  flexCase.install,
].forEach((installer) => installer(defaultSheet));
console.timeEnd("rulesInit");

export {
  passStyle,
  bindStyleCases,
  defaultSheet,
  passStyle as default,
} from "./sheet";
