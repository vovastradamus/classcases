import { Sheet } from "./sheet";

const widthCase = {};
/**
 *
 * @param {Sheet} sheet
 */
widthCase.install = function install(sheet) {
  const { bindStyleCases } = sheet;

  bindStyleCases(
    Object.entries({
      p: "px",
      e: "em",
      r: "rem",
    }).reduce(
      (acc, [dimensionAlias, dimension]) => {
        acc[`w_${dimensionAlias}`] = (value) => `width: ${value}${dimension}`;
        return acc;
      },
      {
        w_a: (value) => (value !== true ? null : `width: auto;`),
      }
    )
  );
};

export default widthCase;
