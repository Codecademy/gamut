export const percentageOrAbsolute = (coordinate) => {
    if (coordinate === 0) {
        return coordinate;
    }
    if (coordinate <= 1 && coordinate >= -1) {
        return `${coordinate * 100}%`;
    }
    return `${coordinate}px`;
};
//# sourceMappingURL=index.js.map