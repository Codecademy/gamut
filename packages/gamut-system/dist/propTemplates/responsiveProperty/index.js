import { assign, entries, isArray, isObject, set, values } from 'lodash';
export const DEFAULT_MEDIA_QUERIES = {
    xs: '@media (min-width: 320px)',
    sm: '@media (min-width: 480px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1248px)',
};
export function responsiveProperty({ propNames, templateFns, }) {
    return (props) => {
        const { breakpoints = DEFAULT_MEDIA_QUERIES } = props?.theme || {};
        const breakpointOrder = ['base', 'xs', 'sm', 'md', 'lg', 'xl'];
        const responsive = {};
        // Iterate through all responsible props and create a base style configuration.
        propNames.forEach((propName) => {
            const propertyValue = props[propName];
            // Handle responsive configurations properly.
            switch (typeof propertyValue) {
                case 'string':
                case 'number':
                    // If no extra styles exist add this to the lowest breakpoint
                    return set(responsive, ['base', propName], propertyValue);
                case 'object': {
                    // Add to the config if it is an array of prop values
                    if (isArray(propertyValue)) {
                        return propertyValue.forEach((value, mediaIndex) => {
                            if (value !== undefined) {
                                return set(responsive, [breakpointOrder[mediaIndex], propName], value);
                            }
                        });
                    }
                    // Add to the config if it is an object of sizes / values
                    if (isObject(propertyValue)) {
                        return entries(propertyValue).forEach(([mediaSize, value]) => {
                            set(responsive, [mediaSize, propName], value);
                        });
                    }
                }
                default:
                    return;
            }
        });
        let styles = {};
        // Iterate through each breakpoints sorted props
        entries(responsive).forEach(([breakpoint, bpProps]) => {
            const templates = values(templateFns);
            // TODO: Only call the templateFns we have props for.1
            templates.forEach((templatFn) => {
                const templateStyles = templatFn?.({ ...bpProps, theme: props.theme }) ?? {};
                // Smallest sizes are always on by default
                if (breakpoint === breakpointOrder[0]) {
                    styles = assign(styles, templateStyles);
                }
                else {
                    // For all sizes higher, create a new media object.
                    const breakpointKey = breakpoints[breakpoint];
                    styles[breakpointKey] = assign(styles[breakpointKey], templateStyles);
                }
            });
        });
        return styles;
    };
}
//# sourceMappingURL=index.js.map