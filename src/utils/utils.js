import { staticMenuItems } from "./Constants";
import shorthash from "shorthash"

export function getDefaultProjectForPicker() {
  return staticMenuItems[0];
}

export function generateViewKey(filterType, itemId) {
  return `${filterType}_${itemId}`;
}

export function createMemoizedFunction(method) {
  const cache = {};
  return (...args) => {
    const cacheKey = shorthash.unique(JSON.stringify(args));
    const lastResult = cache[cacheKey];

    if (lastResult) {
      return lastResult;
    }
    const result = method(...args);
    cache[cacheKey] = result;
    return result;
  };
}
