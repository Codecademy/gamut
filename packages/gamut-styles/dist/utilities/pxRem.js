import { base } from '../variables/base';
export const pxRem = (pixelValue) => {
    const parsedValue = typeof pixelValue === 'string' ? parseInt(pixelValue, 10) : pixelValue;
    return `${parsedValue / base}rem`;
};
//# sourceMappingURL=pxRem.js.map