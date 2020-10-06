import { identity } from 'lodash';
import { compose } from '..';
import { border, layout, typography } from '../../../props';
import { DEFAULT_MEDIA_QUERIES, directionalProperty, standardProperty, } from '../../../propTemplates';
import { createHandler } from '../../createHandler';
const display = createHandler(layout.display);
const textAlign = createHandler(typography.textAlign);
const borderWidth = createHandler(border.borderWidth);
describe(compose, () => {
    it('creates a handler from multiple handlers', () => {
        const displayAndTextAlign = compose(display, textAlign);
        expect(displayAndTextAlign({ textAlign: 'center', display: 'block' })).toEqual({
            textAlign: 'center',
            display: 'block',
        });
    });
    it('creates a handler that can template responsive configurations', () => {
        const displayAndTextAlign = compose(display, textAlign);
        expect(displayAndTextAlign({ textAlign: [, 'center'], display: { lg: 'block' } })).toEqual({
            [DEFAULT_MEDIA_QUERIES['xs']]: {
                textAlign: 'center',
            },
            [DEFAULT_MEDIA_QUERIES['lg']]: {
                display: 'block',
            },
        });
    });
    it('adds all prop names the handler is responsible for to a key on the returned function object', () => {
        const { propNames } = compose(display, textAlign);
        expect(propNames).toEqual(['display', 'textAlign']);
    });
    it('adds all altProp names the handler is responsible for to a key on the returned function object', () => {
        const { propNames } = compose(display, textAlign, borderWidth);
        expect(propNames).toEqual([
            'display',
            'textAlign',
            'borderWidth',
            ...border.borderWidth.altProps,
        ]);
    });
    it('adds template functions for each prop to its template functionMap', () => {
        const { templateFns } = compose(display, textAlign, borderWidth);
        expect(Object.keys(templateFns)).toEqual([
            'display',
            'textAlign',
            'borderWidth',
        ]);
        expect(templateFns.textAlign?.toString()).toEqual(standardProperty({
            propName: 'textAlign',
            computeValue: identity,
        }).toString());
        expect(templateFns.display?.toString()).toEqual(standardProperty({
            propName: 'display',
            computeValue: identity,
        }).toString());
        expect(templateFns.borderWidth?.toString()).toEqual(directionalProperty({
            propName: 'borderWidth',
            computeValue: identity,
        }).toString());
    });
    it('lets the composite function be composed again', () => {
        const displayAndTextAlign = compose(display, textAlign);
        const furtherComposition = compose(displayAndTextAlign, borderWidth);
        expect(furtherComposition({
            textAlign: 'center',
            display: 'block',
            borderWidth: 'inherit',
        })).toEqual({
            textAlign: 'center',
            display: 'block',
            borderBottomWidth: 'inherit',
            borderLeftWidth: 'inherit',
            borderRightWidth: 'inherit',
            borderTopWidth: 'inherit',
        });
    });
});
//# sourceMappingURL=compose-test.js.map