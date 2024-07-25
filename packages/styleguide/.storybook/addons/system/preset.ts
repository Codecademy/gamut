function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve('./register')];
}

function config(entry: any[] = []) {
  return [...entry, require.resolve('./enhancers')];
}

module.exports = { config, managerEntries };
