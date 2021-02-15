import { defaultSheet } from "./sheet";
import spacingCase from "./spacing.case";
import fontCase from "./font.case";
import widthCase from "./width.case";
import flexCase from "./flex.case";

[
  spacingCase.install,
  fontCase.install,
  widthCase.install,
  flexCase.install,
].forEach((installer) => installer(defaultSheet));

export {
  classcase,
  bindStyleCases,
  defaultSheet,
  classcase as default,
} from "./sheet";
