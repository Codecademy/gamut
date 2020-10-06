import { identity } from 'lodash';
import { createHandler } from '..';
import { DEFAULT_MEDIA_QUERIES, directionalProperty, standardProperty, } from '../../../propTemplates';
describe(createHandler, () => {
    it('creates a style function', () => {
        const styleFunction = createHandler({
            propName: 'height',
        });
        expect(styleFunction({ height: 'auto' })).toEqual({ height: 'auto' });
    });
    it('adds prop names the function is responsible for as a key on the function object', () => {
        const styleFunction = createHandler({
            propName: 'height',
        });
        expect(styleFunction.propNames).toEqual(['height']);
    });
    it('adds altProps to the propName array', () => {
        const styleFunction = createHandler({
            propName: 'height',
            altProps: ['maxHeight', 'minHeight'],
        });
        expect(styleFunction.propNames).toEqual([
            'height',
            'maxHeight',
            'minHeight',
        ]);
    });
    it('adds the the template functions to the templateFns key on the function object', () => {
        const { templateFns } = createHandler({
            propName: 'height',
        });
        expect(Object.keys(templateFns)).toEqual(['height']);
        expect(templateFns.height?.toString()).toEqual(standardProperty({
            propName: 'height',
            computeValue: identity,
        }).toString());
    });
    it('creates a directionalProperty if type is specified', () => {
        const { templateFns } = createHandler({
            propName: 'height',
            type: 'directional',
        });
        expect(templateFns.height?.toString()).toEqual(directionalProperty({
            propName: 'height',
            computeValue: identity,
        }).toString());
    });
    it('returns a responsive property to handle media queries', () => {
        const styleFunction = createHandler({
            propName: 'height',
        });
        expect(styleFunction({ height: [, 'auto'] })).toEqual({
            [DEFAULT_MEDIA_QUERIES['xs']]: {
                height: 'auto',
            },
        });
    });
});
//# sourceMappingURL=createHandler-test.js.map