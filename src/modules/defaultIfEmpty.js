"use strict";

import utils from "./utils.js";

export default function* (source , defaultValue){
  if(arguments.length < 2){
    defaultValue = source;
    source = this;
  }
  if(source == null || source == undefined){
    throw new Error("source is null or undefined");
  }

  let next = source.next();
  if(next.done){
    yield source.push(defaultValue);
  }
  while(!next.done){
    yield next.value;
    next = source.next();
  }
}