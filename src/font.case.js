import { Sheet } from "./sheet";

const fontCase = {};
/**
 *
 * @param {Sheet} sheet
 */
fontCase.install = function install(sheet) {
  const { bindStyleCases } = sheet;

  bindStyleCases(
    Object.entries({
      p: "px",
      e: "em",
      r: "rem",
    }).reduce((acc, [dimensionAlias, dimension]) => {
      acc[`fts_${dimensionAlias}`] = (value) =>
        `font-size: ${value}${dimension}`;
      return acc;
    }, {})
  );

  bindStyleCases(
    Object.entries({
      b: "bold",
      bb: "bloder",
      n: "normal",
      l: "lighter",
    }).reduce((acc, [weightTypeAlias, weightType]) => {
      acc[`ftw_${weightTypeAlias}`] = (value) =>
        value !== true ? null : `font-weight: ${weightType}`;
      return acc;
    }, {})
  );

  bindStyleCases({
    ftw_num: (value) => `font-weight: ${value}`,
  });
};

export default fontCase;
