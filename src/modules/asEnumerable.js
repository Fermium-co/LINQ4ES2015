"use strict";

import utils from "./utils";

export default function* (source) {
  source = source || this;
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (utils.isGenerator(source)) {
    throw new Error("enumerable may not be enumerated twice");
  }

  if (Array.isArray(source) || typeof (source) === "string") {
    for (let index = 0; index < source.length; index++) {
      let element = source[index];
      yield element;
    }
  }
  else {
    throw new Error("source can not be enumerated");
  }
};