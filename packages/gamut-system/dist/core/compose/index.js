import { responsiveProperty } from '../../propTemplates';
export const compose = (...handlers) => {
    // Initialize the new composites arguments
    const config = {
        propNames: [],
        templateFns: {},
    };
    // Add each handlers respective propNames and templateFns to the new composite
    handlers.forEach((handler) => {
        if (handler.propNames) {
            config.propNames = [...config.propNames, ...handler.propNames];
        }
        if (handler.templateFns) {
            config.templateFns = { ...config.templateFns, ...handler.templateFns };
        }
    });
    // Create a new responsive property responsible for templating all the single handlers
    const composedHandler = responsiveProperty(config);
    // Make the handlers propNames and functions accessible on the function reference
    composedHandler.propNames = config.propNames;
    composedHandler.templateFns = config.templateFns;
    return composedHandler;
};
//# sourceMappingURL=index.js.map