import { generateHash } from "./hash";
import {
  PLUGIN_ATTR,
  PLUGIN_ATTR_VERSION,
  PLUGIN_PREFIX,
  PLUGIN_VERSION,
} from "./constants";
import { isPlainObject } from "./object";

function createStyleTag() {
  const head = document.head;
  const style = document.createElement("style");
  const nextSibling = head.lastElementChild;

  style.setAttribute(PLUGIN_ATTR, "styled-sheet");
  style.setAttribute(PLUGIN_ATTR_VERSION, PLUGIN_VERSION);

  head.insertBefore(style, nextSibling);

  return style;
}

export class Sheet {
  constructor() {
    this.hashSet = new Set();
    this.parsers = {};
    this.styleEl = null;
  }

  get styleNode() {
    if (!this.styleEl) {
      this.styleEl = createStyleTag();
    }

    return this.styleEl;
  }

  bindStyleCases = (cases) => {
    if (!isPlainObject(cases)) {
      throw new TypeError("Incoming cases is not valid");
    }

    Object.entries(cases).forEach((values) => {
      const [styleCase, caseCb] = values;

      this.parsers[styleCase] = caseCb;
    });
  };

  passStyle = (...args) => {
    const sheet = this.styleNode.sheet;
    const { parsers } = this;
    const [rules] = args;

    if (args.length == 2) {
      return this.passStyle({ [args[0]]: args[1] });
    }

    const styles = Object.entries(rules)
      .map(([ruleKey, ruleValue]) => {
        if (!Object.prototype.hasOwnProperty.call(parsers, ruleKey)) {
          throw new Error("Style rule not found");
        }
        const ryleBody = `${parsers[ruleKey].call(null, ruleValue)}`;
        if (!ryleBody) {
          return null;
        }
        const ryleHash = `${PLUGIN_PREFIX}-${generateHash(ryleBody)}`;

        return [ryleHash, `.${ryleHash} { ${ryleBody} }`];
      })
      .filter(Boolean);

    styles
      .filter(([cssClass]) => cssClass)
      .forEach(([cssClass, cssRule]) => {
        if (!this.hashSet.has(cssClass)) {
          this.hashSet.add(cssClass);
          sheet.insertRule(cssRule, sheet.cssRules.length);
        }
      });

    return styles.map(([cssClass]) => cssClass).join(" ");
  };
}

const sheet = new Sheet();

export const bindStyleCases = sheet.bindStyleCases;
export const passStyle = sheet.passStyle;
export { sheet as defaultSheet };
