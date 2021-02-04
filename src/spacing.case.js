import { Sheet } from "./sheet";
import { pipe } from "./functional";

const spacingCase = {};
/**
 *
 * @param {Sheet} sheet
 */
spacingCase.install = function install(sheet) {
  const { bindStyleCases } = sheet;

  const spacings = [
    ["p", "padding"],
    ["m", "margin"],
  ];
  const spaceDirections = {
    t: ["top"],
    b: ["bottom"],
    l: ["left"],
    r: ["right"],
    lr: ["left", "right"],
    tb: ["top", "bottom"],
    aa: [""],
  };
  const spaceDimensions = [
    ["r", "rem"],
    ["e", "em"],
    ["px", "px"],
  ];

  pipe(
    (v) =>
      spacings.reduce((acc, [alias, styleRule]) => {
        Object.entries(spaceDirections).forEach(
          ([stylePropAlias, styleProps]) => {
            spaceDimensions.forEach(([sizingAlias, sizing]) => {
              acc[`${alias}${stylePropAlias}_${sizingAlias}`] = (value) =>
                styleProps
                  .map(
                    (styleProp) =>
                      `${styleRule}${
                        styleProp ? "-" + styleProp : ""
                      }: ${value}${sizing};`
                  )
                  .join("\n");
            });
            acc[`${alias}${stylePropAlias}_a`] = (value) =>
              !value
                ? ""
                : styleProps
                    .map(
                      (styleProp) =>
                        `${styleRule}${styleProp ? "-" + styleProp : ""}: auto;`
                    )
                    .join("\n");
          }
        );

        return acc;
      }, v),
    bindStyleCases
  )({});
};

export default spacingCase;
