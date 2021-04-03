function managerEntries(entry: any[] = [], options: any) {
  return [...entry, require.resolve('./register')];
}

function config(entry: any[] = []) {
  console.log(entry);
  return [...entry, require.resolve('./enhancers')];
}

module.exports = { config, managerEntries };
