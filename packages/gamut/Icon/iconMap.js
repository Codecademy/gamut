const context = require.context('./icons/', true, /\.js$/);
const iconMap = {};
context.keys().forEach(key => {
  const component = context(key);
  iconMap[component.iconName] = component;
});

export default iconMap;
