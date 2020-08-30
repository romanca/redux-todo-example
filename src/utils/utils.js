import shorthash from "shorthash";

export function generateViewKey(filterType, itemId) {
  return `${filterType}_${itemId}`;
}

export function getViewKeyData(key) {
  const [filterType, itemId] = key.split("_");
  return { filterType, itemId };
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
