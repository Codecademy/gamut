import { get, isObject } from 'lodash';
export const standardProperty = ({ propName, scale, computeValue, }) => {
    return (props) => {
        let propValue = props[propName];
        if (propValue === undefined) {
            return;
        }
        let scaleShape = scale;
        if (typeof scaleShape === 'string') {
            scaleShape = get(props, `theme.${scale}`, {});
        }
        if (isObject(scaleShape)) {
            propValue = get(scaleShape, `${propValue}`, propValue);
        }
        return {
            [propName]: computeValue(propValue),
        };
    };
};
//# sourceMappingURL=index.js.map