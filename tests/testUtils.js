"use strict";

import utils from '../src/modules/utils';

export default {
	setPrototype: (key, value) => {
    utils.GeneratorFunctionProto[key] = value;
    utils.GeneratorFunctionPrototype[key] = value;
  }
};