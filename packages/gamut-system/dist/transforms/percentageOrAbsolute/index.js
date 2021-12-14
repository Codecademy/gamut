export var percentageOrAbsolute = function percentageOrAbsolute(coordinate) {
  if (coordinate === 0) {
    return coordinate;
  }

  if (coordinate <= 1 && coordinate >= -1) {
    return "".concat(coordinate * 100, "%");
  }

  return "".concat(coordinate, "px");
};