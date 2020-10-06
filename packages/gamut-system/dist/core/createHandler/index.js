import { identity } from 'lodash';
import { standardProperty, directionalProperty, responsiveProperty, } from '../../propTemplates';
const TEMPLATES = {
    standard: standardProperty,
    directional: directionalProperty,
};
export const createHandler = (config) => {
    // Initialize the config defaults
    const { propName, altProps = [], computeValue = identity, type = 'standard', } = config;
    // Find the correct template function
    const templateFunction = TEMPLATES[type];
    // Create the style template function for the relative props
    const styleFunction = templateFunction({
        ...config,
        propName,
        computeValue,
    });
    const propNames = [propName, ...altProps];
    const templateFns = {
        [propName]: styleFunction,
    };
    // Create a responsive property for those propNames / templates
    const handler = responsiveProperty({
        propNames,
        templateFns,
    });
    // Make the handlers propNames and functions accessible on the function reference (for compose)
    handler.propNames = propNames;
    handler.templateFns = templateFns;
    return handler;
};
//# sourceMappingURL=index.js.map