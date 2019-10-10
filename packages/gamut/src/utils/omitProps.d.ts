export declare type RemoveFrom<TContainer, TRemoved> = {
    [P in keyof TContainer]: P extends keyof TRemoved ? never : TContainer[P];
};
/**
 * omitProps
 *
 * removes a provided array of props from a props object,
 * leaving necessary props like children intact
 */
export default function omitProps<TOmittedProps extends {}, TProps extends {}>(initialPropsToOmit: TOmittedProps | (keyof TOmittedProps)[], props: TProps): RemoveFrom<TOmittedProps, TProps>;
