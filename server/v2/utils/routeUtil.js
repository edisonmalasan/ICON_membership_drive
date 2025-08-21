function parseFilters(query, allowedOperators) {
  const filters = {};

  if (!query.filter) return filters;

  for (const [key, value] of Object.entries(query.filter)) {
    if (typeof value === "object") {
      filters[key] = {};
      for (const [op, v] of Object.entries(value)) {
        if (allowedOperators.includes(op)) {
          const mongoOp = `$${op}`;
          filters[key][mongoOp] = v;
        }
      }
      continue;
    }

    filters[key] = { $eq: value };
  }
  return filters;
}

module.exports = { parseFilters };