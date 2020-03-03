export const isNull = (props, propName, componentName) => {
  if (props[propName] !== null) {
    return new Error(`Invalid prop ${propName} passed to ${componentName}`);
  }
  return null;
};
